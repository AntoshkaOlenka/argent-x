import { FC, ReactNode } from "react"
import styled from "styled-components"

import {
  ArrowCircleDownIcon,
  LinkIcon,
  VisibilityIcon,
} from "../../components/Icons/MuiIcons"
import { TransactionStatusIndicator } from "../../components/StatusIndicator"
import { formatTruncatedAddress } from "../../services/addresses"
import { NetworkStatusWrapper } from "../networks/NetworkSwitcher"
import { getNetworkAccountImageUrl } from "./accounts.service"

export interface IAccountListItem {
  accountName: string
  accountAddress: string
  networkId: string
  outline?: boolean
  highlight?: boolean
  deploying?: boolean
  upgrade?: boolean
  connected?: boolean
  transparent?: boolean
  hidden?: boolean
  children?: ReactNode
}

type AccountListItemWrapperProps = Pick<
  IAccountListItem,
  "highlight" | "outline" | "transparent"
> & {
  dark?: boolean
}

export const AccountListItemWrapper = styled.div<AccountListItemWrapperProps>`
  cursor: pointer;
  background-color: ${({ highlight, transparent, dark }) =>
    transparent || dark
      ? "transparent"
      : highlight
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(255, 255, 255, 0.1)"};
  border-radius: 4px;
  padding: 20px 16px;
  border: 1px solid
    ${({ outline, dark }) =>
      outline || dark ? "rgba(255, 255, 255, 0.3)" : "transparent"};

  display: flex;
  gap: 12px;
  align-items: center;

  transition: all 200ms ease-in-out;

  &:hover,
  &:focus {
    background: ${({ transparent, dark }) =>
      transparent
        ? "transparent"
        : dark
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(255, 255, 255, 0.15)"};
    outline: 0;
  }
`

const AccountAvatar = styled.img`
  border-radius: 500px;
  width: 40px;
  height: 40px;
`

const AccountColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const AccountRow = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
`

const AccountStatusText = styled.p`
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  text-align: center;
`

const AccountName = styled.h1`
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  margin: 0 0 5px 0;
`

const AccountAddress = styled.div`
  font-size: 13px;
  line-height: 13px;
`

const UpgradeIcon = styled(ArrowCircleDownIcon)`
  font-size: 16px;
`

const ConnectedStatusWrapper = styled(NetworkStatusWrapper)`
  color: ${({ theme }) => theme.blue1};
`

const ConnectedIcon = styled(LinkIcon)`
  transform: rotate(-45deg);
  font-size: 16px;
`

const HiddenStatusWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  width: 40px;
  height: 40px;
  border-radius: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AccountListItem: FC<IAccountListItem> = ({
  accountName,
  accountAddress,
  networkId,
  deploying,
  upgrade,
  connected,
  hidden,
  children,
  ...rest
}) => {
  return (
    <AccountListItemWrapper dark={hidden} {...rest}>
      <AccountAvatar
        src={getNetworkAccountImageUrl({
          accountName,
          accountAddress,
          networkId,
          backgroundColor: hidden ? "333332" : undefined,
        })}
      />
      <AccountRow>
        <AccountColumn>
          <AccountName>{accountName}</AccountName>
          <AccountAddress>
            {formatTruncatedAddress(accountAddress)}
          </AccountAddress>
        </AccountColumn>
        <AccountColumn>
          {deploying ? (
            <NetworkStatusWrapper>
              <TransactionStatusIndicator color="orange" />
              <AccountStatusText>Deploying</AccountStatusText>
            </NetworkStatusWrapper>
          ) : upgrade ? (
            <NetworkStatusWrapper>
              <UpgradeIcon />
              <AccountStatusText>Upgrade</AccountStatusText>
            </NetworkStatusWrapper>
          ) : connected ? (
            <ConnectedStatusWrapper>
              <ConnectedIcon />
              <AccountStatusText>Connected</AccountStatusText>
            </ConnectedStatusWrapper>
          ) : (
            hidden && (
              <HiddenStatusWrapper>
                <VisibilityIcon />
              </HiddenStatusWrapper>
            )
          )}
          {children}
        </AccountColumn>
      </AccountRow>
    </AccountListItemWrapper>
  )
}
