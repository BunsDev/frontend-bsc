import React from 'react'
import styled from 'styled-components'
import every from 'lodash/every'
import {
  Stepper,
  Step,
  StepStatus,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Box,
  CheckmarkIcon,
  Flex,
  useTooltip,
  TooltipText,
  LogoRoundIcon,
  Skeleton,
  useModal,
  Link,
} from '@champagneswap/uikit'
import { NextLinkFromReactRouter as RouterLink } from 'components/NextLink'
import { useWeb3React } from '@web3-react/core'
import { Ifo } from 'config/constants/types'
import { WalletIfoData } from 'views/Ifos/types'
import { useTranslation } from 'contexts/Localization'
import useTokenBalance from 'hooks/useTokenBalance'
import Container from 'components/Layout/Container'
import { useProfile } from 'state/profile/hooks'
import Balance from 'components/Balance'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { FlexGap } from 'components/Layout/Flex'
import { getBalanceNumber } from 'utils/formatBalance'
import VaultStakeModal from 'views/Pools/components/ChamVaultCard/VaultStakeModal'
import { BIG_ZERO } from 'utils/bigNumber'
import BigNumber from 'bignumber.js'
import { useIfoPoolVault, useIfoPoolCredit, useIfoWithApr } from 'state/pools/hooks'
import { useBUSDChamAmount } from 'hooks/useBUSDPrice'
import { useCheckVaultApprovalStatus, useVaultApprove } from 'views/Pools/hooks/useApprove'

interface Props {
  ifo: Ifo
  walletIfoData: WalletIfoData
  isLive?: boolean
}

const Wrapper = styled(Container)`
  margin-left: -16px;
  margin-right: -16px;
  padding-top: 48px;
  padding-bottom: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: -24px;
    margin-right: -24px;
  }
`

const InlineLink = styled(Link)`
  display: inline;
`

const SmallStakePoolCard = styled(Box)`
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.background};
`

const Step1 = ({ hasProfile }: { hasProfile: boolean }) => {
  const { t } = useTranslation()
  const ifoPoolVault = useIfoPoolVault()
  const credit = useIfoPoolCredit()
  const { pool } = useIfoWithApr()

  const { isVaultApproved, setLastUpdated } = useCheckVaultApprovalStatus(pool.vaultKey)
  const { handleApprove, pendingTx } = useVaultApprove(pool.vaultKey, setLastUpdated)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <Box>
      <span>
        {t(
          'IFO credit is calculated by average block balance in the IFO pool in over the staking period announced with each IFO proposal.',
        )}
      </span>{' '}
      <InlineLink
        external
        href="https://medium.com/champagneswap/initial-farm-offering-ifo-3-0-ifo-staking-pool-622d8bd356f1"
      >
        {t('Please refer to our blog post for more details.')}
      </InlineLink>
    </Box>,
    {},
  )

  const creditDollarValue = useBUSDChamAmount(getBalanceNumber(credit))

  const stakingTokenBalance = pool?.userData?.stakingTokenBalance
    ? new BigNumber(pool.userData.stakingTokenBalance)
    : BIG_ZERO

  const [onPresentStake] = useModal(
    <VaultStakeModal
      stakingMax={stakingTokenBalance}
      performanceFee={ifoPoolVault.fees.performanceFeeAsDecimal}
      pool={pool}
    />,
  )

  return (
    <CardBody>
      {tooltipVisible && tooltip}
      <Heading as="h4" color="secondary" mb="16px">
        {t('Stake CHAM in IFO pool')}
      </Heading>
      <Box>
        <Text color="textSubtle" small>
          {t(
            'The maximum amount of CHAM user can commit to all the sales combined, is equal to the average CHAM balance in the IFO CHAM pool prior to the IFO. Stake more CHAM to increase the maximum CHAM you can commit to the sale. Missed this IFO? You can keep staking in the IFO CHAM Pool to join the next IFO sale.',
          )}
        </Text>
        <TooltipText as="span" fontWeight={700} ref={targetRef} color="textSubtle" small>
          {t('How does the IFO credit calculated?')}
        </TooltipText>
      </Box>
      {hasProfile && (
        <SmallStakePoolCard borderRadius="default" p="16px">
          <FlexGap justifyContent="space-between" alignItems="center" flexWrap="wrap" gap="16px">
            <Flex>
              <LogoRoundIcon style={{ alignSelf: 'flex-start' }} width={32} height={32} />
              <Box ml="16px">
                <Text bold fontSize="12px" textTransform="uppercase" color="secondary">
                  {t('Your max CHAM entry')}
                </Text>
                <Balance fontSize="20px" bold decimals={5} value={getBalanceNumber(credit)} />
                <Text fontSize="12px" color="textSubtle">
                  {creditDollarValue !== undefined ? (
                    <Balance
                      value={creditDollarValue}
                      fontSize="12px"
                      color="textSubtle"
                      decimals={2}
                      prefix="~"
                      unit=" USD"
                    />
                  ) : (
                    <Skeleton mt="1px" height={16} width={64} />
                  )}
                </Text>
              </Box>
            </Flex>
            {isVaultApproved ? (
              <Button onClick={onPresentStake}>{t('Stake')} CHAM</Button>
            ) : (
              <Button disabled={pendingTx} onClick={handleApprove}>
                {t('Enable pool')}
              </Button>
            )}
          </FlexGap>
        </SmallStakePoolCard>
      )}
    </CardBody>
  )
}

const Step2 = ({ hasProfile, isLive, isCommitted }: { hasProfile: boolean; isLive: boolean; isCommitted: boolean }) => {
  const { t } = useTranslation()
  return (
    <CardBody>
      <Heading as="h4" color="secondary" mb="16px">
        {t('Commit CHAM')}
      </Heading>
      <Text color="textSubtle" small>
        {t('When the IFO sales are live, you can “commit” your CHAM to buy the tokens being sold.')} <br />
        {t('We recommend committing to the Basic Sale first, but you can do both if you like.')}
      </Text>
      {hasProfile && isLive && !isCommitted && (
        <Button as="a" href="#current-ifo" mt="16px">
          {t('Commit CHAM')}
        </Button>
      )}
    </CardBody>
  )
}

const IfoSteps: React.FC<Props> = ({ ifo, walletIfoData, isLive }) => {
  const { poolBasic, poolUnlimited } = walletIfoData
  const { hasProfile } = useProfile()
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { balance } = useTokenBalance(ifo.currency.address)
  const isCommitted =
    poolBasic.amountTokenCommittedInLP.isGreaterThan(0) || poolUnlimited.amountTokenCommittedInLP.isGreaterThan(0)
  const stepsValidationStatus = [
    hasProfile,
    balance.isGreaterThan(0),
    isCommitted,
    poolBasic.hasClaimed || poolUnlimited.hasClaimed,
  ]

  const getStatusProp = (index: number): StepStatus => {
    const arePreviousValid = index === 0 ? true : every(stepsValidationStatus.slice(0, index), Boolean)
    if (stepsValidationStatus[index]) {
      return arePreviousValid ? 'past' : 'future'
    }
    return arePreviousValid ? 'current' : 'future'
  }

  const renderCardBody = (step: number) => {
    const isStepValid = stepsValidationStatus[step]

    const renderAccountStatus = () => {
      if (!account) {
        return <ConnectWalletButton />
      }

      if (isStepValid) {
        return (
          <Flex alignItems="center">
            <Text color="success" bold mr="8px">
              {t('Profile Active!')}
            </Text>
            <CheckmarkIcon color="success" />
          </Flex>
        )
      }

      return (
        <Button as={RouterLink} to={`${nftsBaseUrl}/profile/${account.toLowerCase()}`}>
          {t('Activate your Profile')}
        </Button>
      )
    }

    switch (step) {
      case 0:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Activate your Profile')}
            </Heading>
            <Text color="textSubtle" small mb="16px">
              {t('You’ll need an active ChampagneSwap Profile to take part in an IFO!')}
            </Text>
            {renderAccountStatus()}
          </CardBody>
        )
      case 1:
        return <Step1 hasProfile={hasProfile} />
      case 2:
        return <Step2 hasProfile={hasProfile} isLive={isLive} isCommitted={isCommitted} />
      case 3:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Claim your tokens and achievement')}
            </Heading>
            <Text color="textSubtle" small>
              {t(
                'After the IFO sales finish, you can claim any IFO tokens that you bought, and any unspent CHAM tokens will be returned to your wallet.',
              )}
            </Text>
          </CardBody>
        )
      default:
        return null
    }
  }

  return (
    <Wrapper>
      <Heading id="ifo-how-to" as="h2" scale="xl" color="secondary" mb="24px" textAlign="center">
        {t('How to Take Part')}
      </Heading>
      <Stepper>
        {stepsValidationStatus.map((_, index) => (
          <Step
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            statusFirstPart={getStatusProp(index)}
            statusSecondPart={getStatusProp(index + 1)}
          >
            <Card>{renderCardBody(index)}</Card>
          </Step>
        ))}
      </Stepper>
    </Wrapper>
  )
}

export default IfoSteps
