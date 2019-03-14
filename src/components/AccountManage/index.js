import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Header, Modal, Toast } from 'components'
import classnames from 'classnames'
import iost from 'iostJS/iost'
import * as accountActions from 'actions/accounts'
import ui from 'utils/ui';
import './index.scss'


const { Modal1 } = Modal


class AccountManage extends Component<Props> {
  componentDidMount() {
    ui.settingLocation('/accountManage')
  }
  onCopy = () => {
    Toast.html(I18n.t('ManageAccount_Copy'))
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  // 第一次导入账号后，点击返回会直接到主页account页面，
  // 正常情况下，从设置页进入，也就返回设置页。
  backTo = () => {
    const { changeLocation, locationList } = this.props
    ui.deleteLocation()
    const currentLocation = locationList[locationList.length - 1]
    if (currentLocation == '/accountImport') {
      changeLocation('/account')
    } else {
      changeLocation('/accountSetting')
    }
  }

  onDelete = () => {
    const accounts = this.props.accounts.filter(item => `${item.name}_${item.network}` != `${this.delItem.name}_${this.delItem.network}`)
    chrome.storage.local.set({accounts: accounts})
    this.props.dispatch(accountActions.setAccounts(accounts))
    chrome.storage.local.get(['activeAccount'], ({activeAccount}) => {
      if(activeAccount && activeAccount.name == this.delItem.name && activeAccount.network == this.delItem.network){
        // reset current account
        const url = accounts[0].network == 'MAINNET'?'https://api.iost.io':'http://13.52.105.102:30001';
        iost.changeNetwork(url)
        iost.loginAccount(accounts[0].name, accounts[0].publicKey)
        chrome.storage.local.set({ activeAccount: accounts[0] })
      }
    })
    ui.toggleModal()
    if(!accounts.length){
      this.props.changeLocation('/accountImport')
    }
  }

  deleteAccount = (item) => () => {
    this.delItem = item
    ui.toggleModal()
  }

  render() {
    const { accounts } = this.props
    return (
      <Fragment>
        <Header title={I18n.t('Settings_accountManage')} onBack={this.backTo} onAdd={this.moveTo('/accountImport')} setting={false} />
        {/*<Header title={I18n.t('accountManage')} onBack={this.backTo} onAdd={this.moveTo('/accountImport')} setting={false} />*/}
        <div className="accountManage-box">
          {
            accounts.map((item) =>
              <div className="account-item" key={item.name + '_' + item.network}>
                <div className="left">
                  <div className="account-name-box">
                    <span className={classnames('account-title', item.network != 'MAINNET' ? 'test' : '')}>{item.network != 'MAINNET' ? I18n.t('ManageAccount_Test') : I18n.t('ManageAccount_Official')}</span>
                    <span className="account-name">{item.name}</span>
                  </div>
                  <div className="publicKey-box">
                    <span className="publicKey-title">{I18n.t('ManageAccount_PublicKey')}</span>
                    <span className="publicKey-name">
                      <span>********</span>
                      <CopyToClipboard onCopy={this.onCopy} text={item.publicKey}>
                        <i className="copy" />
                      </CopyToClipboard>
                    </span>
                  </div>
                </div>
                <i className="right" onClick={this.deleteAccount(item)} />
              </div>
            )
          }
        </div>
        <Modal1 onDelete={this.onDelete} />
      </Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(AccountManage)

