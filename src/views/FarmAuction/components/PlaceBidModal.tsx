import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { MaxUint256 } from '@ethersproject/constants'
import { Modal, Text, Flex, BalanceInput, Box, Button, LogoRoundIcon } from '@champagneswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { formatNumber, getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import { ethersToBigNumber } from 'utils/bigNumber'
import useTheme from 'hooks/useTheme'
import useTokenBalance from 'hooks/useTokenBalance'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useCham, useFarmAuctionContract } from 'hooks/useContract'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import useToast from 'hooks/useToast'
import ConnectWalletButton from 'components/ConnectWalletButton'
import ApproveConfirmButtons, { ButtonArrangement } from 'components/ApproveConfirmButtons'
import { ConnectedBidder, FetchStatus } from 'config/constants/types'
import { usePriceChamBusd } from 'state/farms/hooks'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'

const StyledModal = styled(Modal)`
  min-width: 280px;
  max-width: 320px;
  & > div:nth-child(2) {
    padding: 0;
  }
`

const ExistingInfo = styled(Box)`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.dropdown};
`

const InnerContent = styled(Box)`
  padding: 24px;
`

interface PlaceBidModalProps {
  onDismiss?: () => void
  // undefined initialBidAmount is passed only if auction is not loaded
  // in this case modal will not be possible to open
  initialBidAmount?: number
  connectedBidder: ConnectedBidder
  refreshBidders: () => void
}

const PlaceBidModal: React.FC<PlaceBidModalProps> = ({
  onDismiss,
  initialBidAmount,
  connectedBidder,
  refreshBidders,
}) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { callWithGasPrice } = useCallWithGasPrice()

  const [bid, setBid] = useState('')
  const [isMultipleOfTen, setIsMultipleOfTen] = useState(false)
  const [isMoreThanInitialBidAmount, setIsMoreThanInitialBidAmount] = useState(false)
  const [userNotEnoughCham, setUserNotEnoughCham] = useState(false)
  const [errorText, setErrorText] = useState(null)

  const { balance: userCham, fetchStatus } = useTokenBalance(tokens.cham.address)
  const userChamBalance = getBalanceAmount(userCham)

  const chamPriceBusd = usePriceChamBusd()
  const farmAuctionContract = useFarmAuctionContract()
  const chamContract = useCham()

  const { toastSuccess } = useToast()

  const { bidderData } = connectedBidder
  const { amount, position } = bidderData
  const isFirstBid = amount.isZero()
  const isInvalidFirstBid = isFirstBid && !isMoreThanInitialBidAmount

  useEffect(() => {
    setIsMoreThanInitialBidAmount(parseFloat(bid) >= initialBidAmount)
    setIsMultipleOfTen(parseFloat(bid) % 10 === 0 && parseFloat(bid) !== 0)
    if (fetchStatus === FetchStatus.Fetched && userChamBalance.lt(bid)) {
      setUserNotEnoughCham(true)
    } else {
      setUserNotEnoughCham(false)
    }
  }, [bid, initialBidAmount, fetchStatus, userChamBalance])

  useEffect(() => {
    if (userNotEnoughCham) {
      setErrorText(t('Insufficient CHAM balance'))
    } else if (!isMoreThanInitialBidAmount && isFirstBid) {
      setErrorText(t('First bid must be %initialBidAmount% CHAM or more.', { initialBidAmount }))
    } else if (!isMultipleOfTen) {
      setErrorText(t('Bid must be a multiple of 10'))
    } else {
      setErrorText(null)
    }
  }, [isMultipleOfTen, isMoreThanInitialBidAmount, userNotEnoughCham, initialBidAmount, t, isFirstBid])

  const { isApproving, isApproved, isConfirmed, isConfirming, handleApprove, handleConfirm } =
    useApproveConfirmTransaction({
      onRequiresApproval: async () => {
        try {
          const response = await chamContract.allowance(account, farmAuctionContract.address)
          const currentAllowance = ethersToBigNumber(response)
          return currentAllowance.gt(0)
        } catch (error) {
          return false
        }
      },
      onApprove: () => {
        return callWithGasPrice(chamContract, 'approve', [farmAuctionContract.address, MaxUint256])
      },
      onApproveSuccess: async ({ receipt }) => {
        toastSuccess(
          t('Contract approved - you can now place your bid!'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
        )
      },
      onConfirm: () => {
        const bidAmount = new BigNumber(bid).times(DEFAULT_TOKEN_DECIMAL).toString()
        return callWithGasPrice(farmAuctionContract, 'bid', [bidAmount])
      },
      onSuccess: async ({ receipt }) => {
        refreshBidders()
        onDismiss()
        toastSuccess(t('Bid placed!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      },
    })

  const handleInputChange = (input: string) => {
    setBid(input)
  }

  const setPercentageValue = (percentage: number) => {
    const rounding = percentage === 1 ? BigNumber.ROUND_FLOOR : BigNumber.ROUND_CEIL
    const valueToSet = getBalanceAmount(userCham.times(percentage)).div(10).integerValue(rounding).times(10)
    setBid(valueToSet.toString())
  }
  return (
    <StyledModal title={t('Place a Bid')} onDismiss={onDismiss} headerBackground={theme.colors.gradients.cardHeader}>
      <ExistingInfo>
        <Flex justifyContent="space-between">
          <Text>{t('Your existing bid')}</Text>
          <Text>{t('%num% CHAM', { num: getBalanceNumber(amount).toLocaleString() })}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('Your position')}</Text>
          <Text>{position ? `#${position}` : '-'}</Text>
        </Flex>
      </ExistingInfo>
      <InnerContent>
        <Flex justifyContent="space-between" alignItems="center" pb="8px">
          <Text>{t('Bid a multiple of 10')}</Text>
          <Flex>
            <LogoRoundIcon width="24px" height="24px" mr="4px" />
            <Text bold>CHAM</Text>
          </Flex>
        </Flex>
        {isFirstBid && (
          <Text pb="8px" small>
            {t('First bid must be %initialBidAmount% CHAM or more.', { initialBidAmount })}
          </Text>
        )}
        <BalanceInput
          isWarning={!isMultipleOfTen || isInvalidFirstBid}
          placeholder="0"
          value={bid}
          onUserInput={handleInputChange}
          currencyValue={
            chamPriceBusd.gt(0) &&
            `~${bid ? chamPriceBusd.times(new BigNumber(bid)).toNumber().toLocaleString() : '0.00'} USD`
          }
        />
        <Flex justifyContent="flex-end" mt="8px">
          <Text fontSize="12px" color="textSubtle" mr="8px">
            {t('Balance')}:
          </Text>
          <Text fontSize="12px" color="textSubtle">
            {formatNumber(userChamBalance.toNumber(), 3, 3)}
          </Text>
        </Flex>
        {errorText && (
          <Text color="failure" textAlign="right" fontSize="12px">
            {errorText}
          </Text>
        )}
        <Flex justifyContent="space-between" mt="8px" mb="24px">
          <Button
            disabled={fetchStatus !== FetchStatus.Fetched}
            scale="xs"
            mx="2px"
            p="4px 16px"
            variant="tertiary"
            onClick={() => setPercentageValue(0.25)}
          >
            25%
          </Button>
          <Button
            disabled={fetchStatus !== FetchStatus.Fetched}
            scale="xs"
            mx="2px"
            p="4px 16px"
            variant="tertiary"
            onClick={() => setPercentageValue(0.5)}
          >
            50%
          </Button>
          <Button
            disabled={fetchStatus !== FetchStatus.Fetched}
            scale="xs"
            mx="2px"
            p="4px 16px"
            variant="tertiary"
            onClick={() => setPercentageValue(0.75)}
          >
            75%
          </Button>
          <Button
            disabled={fetchStatus !== FetchStatus.Fetched}
            scale="xs"
            mx="2px"
            p="4px 16px"
            variant="tertiary"
            onClick={() => setPercentageValue(1)}
          >
            MAX
          </Button>
        </Flex>
        <Flex flexDirection="column">
          {account ? (
            <ApproveConfirmButtons
              isApproveDisabled={isApproved}
              isApproving={isApproving}
              isConfirmDisabled={
                !isMultipleOfTen ||
                getBalanceAmount(userCham).lt(bid) ||
                isConfirmed ||
                isInvalidFirstBid ||
                userNotEnoughCham
              }
              isConfirming={isConfirming}
              onApprove={handleApprove}
              onConfirm={handleConfirm}
              buttonArrangement={ButtonArrangement.SEQUENTIAL}
            />
          ) : (
            <ConnectWalletButton />
          )}
        </Flex>
        <Text color="textSubtle" small mt="24px">
          {t('If your bid is unsuccessful, you’ll be able to reclaim your CHAM after the auction.')}
        </Text>
      </InnerContent>
    </StyledModal>
  )
}

export default PlaceBidModal
