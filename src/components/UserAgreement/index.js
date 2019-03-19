import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import { Header } from 'components'
import ui from 'utils/ui';
import './index.scss'

type Props = {

}

class UserAgreement extends Component<Props> {
  backTo = () => {
    const { changeLocation, locationList } = this.props
    ui.deleteLocation()
    changeLocation(locationList[locationList.length - 1])
  }
  render() {
    return (
      <Fragment>
        <Header title={I18n.t('AboutIOST_userAgreement')} onBack={this.backTo} hasSetting={false} />
        <div className="userAgreement-box">
          <div className="userAgreement-wrapper">
            <h2>Privacy Policy</h2>
            <p>The iWallet (“<b>We</b>”; “<b>us</b>”; or “<b>our</b>”) are committed to protecting and respecting your privacy.</p>
            <p>This policy (together with our terms of use on our website https://github.com/lucusfly/iost-extension (the “<b>Site</b>“) and any other documents referred to on it) sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us. Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it.</p>
            <h3>What data do we collect from you?</h3>
            <p>If you go to our Site or utilize other services, we may collect and process the following personal data about you:</p>
            <p>1)	Information you give us</p>
            <p className="space">This is information about you that you give us by filling in forms on our Site, filling in forms on the sites of third party vendors providing us with a service, or by speaking with us in person, corresponding with us by phone, e-mail or otherwise. It includes information you provide when you apply to attend one of the events that we host, attend one of the events that we host, apply for a job on our Site, ask to receive our newsletter, provide us with feedback on our tech and when you report a problem with our Site. The information you give us may include your name, address, e-mail address and phone number and job application information (e.g. your CV, education data, and picture).</p>
            <p>2)	Information we collect about you</p>
            <p className="space">With regard to each of your visits to our Site we may automatically collect the following information:</p>
            <ul>
              <li>technical information, including the Internet protocol (IP) address used to connect your computer to the Internet, browser type and version, and versions, operating system and platform; and</li>
              <li>information about your visit, including the full Uniform Resource Locators (URL), page response times and download errors.</li>
            </ul>
            <p>3)	Information we receive from other sources</p>
            <p className="space">This is information we receive about you if you use any of the other websites we operate or the other services we provide or, to the extent permitted by law, publicly accessible information about you on e.g. business social media. We are working closely with third parties (including, for example, recruitment services providers, and event organization service providers and event partners). We will notify you when we receive information about you from them and the purposes for which we intend to use that information.</p>
            <h3>Cookies</h3>
            <p>Our Site uses cookies to distinguish you from other users of our Site. This helps us to provide you with a good experience when you browse our Site and also allows us to improve our Site. For detailed information on the cookies we use and the purposes for which we use them see our “Cookie Policy” below.</p>
            <h3>For what purposes do we use your data and what is the legal basis for this use?</h3>
            <p>We may use information held about you in the following ways and relying on the following legal bases:</p>
            <p>1)	As required by us to conduct our business and pursue our legitimate interests, in particular:</p>
            <ul>
              <li>to notify you about changes to our service;</li>
              <li>to ensure that contents from our Site are presented in the most effective manner for you and for your computer;</li>
              <li>to administer our Site and for internal operations, including troubleshooting and statistical purposes;</li>
              <li>to improve our Site to ensure that contents are presented in the most effective manner for you and for your computer;</li>
              <li>to allow you to participate in interactive features of our service, when you choose to do so;</li>
              <li>as part of our efforts to keep our Site safe and secure;</li>
              <li>to use information you provide to investigate any complaints received from you or from others, about our Site or our products or services;</li>
              <li>to address any interest you or your team show in our tech or any collaboration with us;</li>
              <li>to improve our tech;</li>
              <li>to assess your eligibility for the particular role you applied for;</li>
              <li>to assess your eligibility for any role that we might have available;</li>
              <li>to schedule, arrange and administer events and meetups in which you have expressed an interest (including creating an attendance record for the event and sending anonymized data to the venue including attendees, dietary requirements and accessibility requirements);</li>
              <li>to use data in connection with legal claims, compliance, regulatory and investigative purposes as necessary (including disclosure of such information in connection with legal process or litigation); and</li>
              <li>Information we receive from other sources: We will combine this information with information you give to us and information we collect about you. We will use this information and the combined information for the purposes set out above (depending on the types of information we receive).</li>
            </ul>
            <p>2)	Where you give us consent:</p>
            <ul>
              <li>we or our carefully selected partners will send you direct marketing in relation to our relevant products and services, or other products and services provided by us, our affiliates and carefully selected partners. However, we will only provide you with marketing related information after you have, where legally required to do so, opted in to receive those communications and having provided the opportunity for you to opt out at any time;</li>
              <li>we place cookies and use similar technologies in accordance with our Cookies Policy and the information provided to you when those technologies are used;</li>
              <li>on other occasions where we ask you for consent. We will use the data for the purpose which we explain at that time.</li>
            </ul>
            <p>3)	For purposes which are required by law:</p>
            <ul>
              <li>In response to requests by government or law enforcement authorities conducting an investigation.</li>
            </ul>
            <h3>Relying on our legitimate interests</h3>
            <p>We have carried out balancing tests for all the data processing we carry out on the basis of our legitimate interests, which we have described above. You can obtain information on any of our balancing tests by contacting us using the details set out later in this notice.</p>
            <h3>Withdrawing consent or otherwise objecting to direct marketing</h3>
            <p>Wherever we rely on your consent, you will always be able to withdraw that consent, although we may have other legal grounds for processing your data for other purposes, such as those set out above. In some cases, we are able to send you direct marketing without your consent, where we rely on our legitimate interests. Once we have received notification that you have withdrawn your consent, we will no longer process your information for the purpose(s) to which you originally consented unless there is no other legal ground for the processing.</p>
            <p>You have an absolute right to opt-out of direct marketing, or profiling we carry out for direct marketing, at any time. You can do this by following the instructions in the communication where this is an electronic message, or by contacting us using the details set out below.</p>
            <h3>Who will we share your data with, where and when?</h3>
            <p>We will share your personal information with:</p>
            <p>1)	Any member of our group, which means our subsidiaries, our ultimate holding company and its subsidiaries for:</p>
            <ul>
              <li>website maintenance and security; and</li>
              <li>recruitment and hiring.</li>
            </ul>
            <p>2)	Selected third parties including but not limited to:</p>
            <ul>
              <li>business partners and sub-contractors for the performance of any contract we enter into with them or you;</li>
              <li>our newsletter service provider for the purposes of providing you with our newsletter;</li>
              <li>event organization service providers for the purposes of scheduling and arranging events and meetups in which you have expressed an interest;</li>
              <li>our applicant tracking system service provider for the purposes of assessing your application for a role at us;</li>
              <li>third party developers for and/or providers of website hosting and maintenance.</li>
            </ul>
            <h3>We will also disclose your personal information to third parties:</h3>
            <p>1)	In the event that we sell or buy any business or assets, in which case we will disclose your personal data to the prospective seller or buyer of such business or assets.</p>
            <p>2)	If we or substantially all of our assets are acquired by a third party, in which case personal data held by it about its customers will be one of the transferred assets.</p>
            <p>3)	If we are under a duty to disclose or share your personal data in order to comply with any legal obligation, or in order to enforce or apply our terms of use and other agreements; or to protect the rights, property, or safety of us, our customers, or others. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction.</p>
            <p>The data that we collect from you may be transferred to, and stored at, a destination outside the European Economic Area ("EEA"). It may also be processed by staff operating outside the EEA (in our case the US) who works for us or for one of our suppliers.</p>
            <p>Where information is transferred outside the EEA, and where this is to a stakeholder or vendor in a country that is not subject to an adequacy decision by the EU Commission, data is adequately protected by EU Commission approved standard contractual clauses, an appropriate Privacy Shield certification or a vendor's Processor Binding Corporate Rules. A copy of the relevant mechanism can be provided for your review on request to lucusfly260@gmail.com.</p>
            <p>Our Site may, from time to time, contain links to and from the websites of our partner networks, and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to these websites.</p>
            <h3>Your rights</h3>
            <p>You have the right to ask us for a copy of your personal data; to correct, delete or restrict (stop any active) processing of your personal data; and to obtain the personal data you provide to us for a contract or with your consent in a structured, machine readable format, and to ask us to share (port) this data to another controller.</p>
            <p>In addition, you can object to the processing of your personal data in some circumstances (in particular, where we don’t have to process the data to meet a contractual or other legal requirement).</p>
            <p>These rights may be limited, for example if fulfilling your request would reveal personal data about another person, where they would infringe the rights of a third party (including our rights) or if you ask us to delete information which we are required by law to keep or have compelling legitimate interests in keeping. Relevant exemptions are included in the GDPR. We will inform you of relevant exemptions we rely upon when responding to any request you make.</p>
            <p>To exercise any of these rights, or to obtain other information, such as a copy of a legitimate interests balancing test, you can get in touch with us using the details set out under the Section “Contact” below. If you have unresolved concerns, you have the right to complain to an EU data protection authority where you live, work or where you believe a breach may have occurred.</p>
            <p>You have the right to ask us not to process your personal data for marketing purposes. We will usually inform you (before collecting your data) if we intend to use your data for such purposes or if we intend to disclose your information to any third party for such purposes. You can exercise your right to prevent such processing by checking certain boxes on the forms we use to collect your data. You can also exercise the right at any time by contacting us at lucusfly260@gmail.com.</p>
            <h3>Which entity is my data controller, and which affiliates might my data be shared with?</h3>
            <p>The data controller for your information is us, i.e. the Internet of Services Foundation.</p>
            <p>Your data might be shared with our affiliated companies for other legitimate purposes.</p>
            <h3>How long will you retain my data?</h3>
            <p>Where you are a contributor, customer or a registered user, we will keep your information for the duration of any contractual relationship you have with us, and, to the extent permitted, after the end of that relationship for as long as necessary to perform the purposes set out in this notice.</p>
            <p>Where we process personal data with your consent, we process the data until you ask us to stop and for a short period after this (to allow us to implement your requests). We also keep a record of the fact that you have asked us not to process your data indefinitely so that we can respect your request in future.</p>
            <p>For data about your visits to our Site and where we process personal data for Site security purposes, we will retain this data for 6 months following your last visit of our Site.</p>
            <p>Data you provided to us in the course of your job application will be kept for 6 months, if your application was not successful. If you enter in an employment relationship with us, the relevant information will be kept for the duration of the employment contract as part of your personnel file.</p>
            <p>Laws may require us to hold certain information for specific periods. In other cases, we may retain data for an appropriate period after any relationship with you ends to protect itself from legal claims, or to administer its business.</p>
            <h3>How you protect my data</h3>
            <p>We strive to maintain the highest standards of security and we has put in place robust technical and organizational measures for the protection of your data in accordance with the current, general state of the art technologies, especially to protect the data against loss, falsification or access by unauthorized third persons. However the transmission of information via the internet is not completely secure. So, whilst we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to our Site. Any transmission is at your own risk. Once we have received your personal data we will use strict procedures and security features to prevent unauthorized access.</p>
            <p>Where we have given you (or where you have chosen) a password which enables you to access certain parts of our Site, you are responsible for keeping this password confidential. We ask you not to share a password with anyone.</p>
            <h3>Cookie-Policy</h3>
            <p>Cookies are small text files that are placed on your computer by the websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site. The use of cookies is now standard for most websites. If you are uncomfortable with the use of cookies, you can manage and control them through your browser, including removing cookies by deleting them from your ‘browser history’ (cache) when you leave the site. See the subsection “How to manage cookies” for further information.</p>
            <h3>Necessary cookies</h3>
            <p>The law states that we can store cookies on your device if they are strictly necessary for the operation of this site. To set all other types of cookies we need your permission. Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.</p>
            <h3>How to manage cookies</h3>
            <p>Current versions of web browsers offer enhanced user controls regarding the placement and duration of both first and third party cookies. Search for "cookies" under your web browser's “Help menu” for more information on cookie management features available to you. You can enable or disable cookies by modifying the settings in your browser. You can also find out how to do this, and find more information on cookies at www.allaboutcookies.org. However, if you choose to disable cookies in your browser, you may be unable to complete certain activities on our Site or to correctly access certain parts of it. If you would like more information about interest-based advertising, including how to opt-out of these cookies, please visit http://youronlinechoices.eu/.</p>
            <h3>Changes to our privacy policy</h3>
            <p>Any changes we make to our privacy policy in the future will be posted on this page and, where appropriate, notified to you by e-mail. Please check back frequently to see any updates or changes to our privacy policy.</p>
            <h3>Contact</h3>
            <p>Questions, comments and requests regarding this privacy policy are welcomed and should be addressed to lucusfly260@gmail.com or by writing to us.</p>
            {/*<ul>*/}
              {/*{*/}
                {/*[...Array(40).keys()].map((item, index) => <li key={index}>{item}</li>)*/}
              {/*}*/}
            {/*</ul>*/}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(UserAgreement)
