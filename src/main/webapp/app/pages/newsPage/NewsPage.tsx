import * as React from 'react';
import { CitationText } from 'app/components/CitationText';
import NewsList, { getNews, getNewsTitle } from 'app/pages/newsPage/NewsList';
import { NEWS_BY_DATE } from 'app/pages/newsPage/NewsPageContent';
import {
  DOCUMENT_TITLES,
  ONCOKB_CONTACT_EMAIL,
  ONCOKB_NEWS_GROUP_SUBSCRIPTION_LINK,
  PAGE_ROUTE
} from 'app/config/constants';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import LevelChange from 'content/images/loe-change.png';
import { Linkout } from 'app/shared/links/Linkout';
import { RouterStore } from 'mobx-react-router';
import { scrollWidthOffsetInNews } from 'app/shared/utils/Utils';
import { inject, observer } from 'mobx-react';
@inject('routing')
@observer
export default class NewsPage extends React.Component<{
  routing: RouterStore;
}> {
  componentDidMount(): void {
    // We have to add an offset when the page has a fix header
    // https://github.com/rafrex/react-router-hash-link/issues/13
    if (this.props.routing.location.hash) {
      setTimeout(() => {
        const id = this.props.routing.location.hash.slice(1);
        const element = document.getElementById(id);
        scrollWidthOffsetInNews(element);
      }, 500);
    }
  }

  render() {
    return (
      <DocumentTitle title={DOCUMENT_TITLES.NEWS}>
        <div className="news">
          <div>
            <p>
              While we aim to keep the information up to date and correct, there
              will inevitably be gaps or mistakes. Please help us to identify
              any issues by <b>sending an email to</b>{' '}
              <a
                href={`mailto:${ONCOKB_CONTACT_EMAIL}?subject=OncoKB Feedback`}
              >
                {ONCOKB_CONTACT_EMAIL}
              </a>
              , or use the feedback button that appears next to alterations in
              cBioPortal.
            </p>
            <p>
              <b>Stay tuned</b> for future data updates (improved annotations,
              new alterations), as well as new features. You can follow us on
              Twitter (
              <a
                href="https://twitter.com/OncoKB"
                target="_blank"
                rel="noopener noreferrer"
              >
                @OncoKB
              </a>
              ) or subscribe to our{' '}
              <b>
                <Linkout link={ONCOKB_NEWS_GROUP_SUBSCRIPTION_LINK}>
                  low-volume email list
                </Linkout>
              </b>{' '}
              for updates.
            </p>
            <CitationText />
          </div>
          <div className="mt-2">
            <NewsList date={'02122020'} />
            <NewsList date={'12202019'}>
              <div>Introducing Simplified OncoKB Levels of Evidence:</div>
              <ul>
                <li>
                  <b>New Level 2</b>, defined as “Standard care biomarker
                  recommended by the NCCN or other expert panels predictive of
                  response to an FDA-approved drug in this indication” (formerly
                  Level 2A).
                </li>
                <li>
                  <b>Unified Level 3B</b>, defined as “Standard care or
                  investigational biomarker predictive of response to an
                  FDA-approved or investigational drug in another indication”
                  (combination of previous Levels 2B and 3B).
                </li>
              </ul>
              <img className="md-auto" src={LevelChange} />
              <div>
                We have implemented these changes for 2 reasons:
                <ol>
                  <li>
                    To be consistent with the{' '}
                    <Linkout link="https://www.sciencedirect.com/science/article/pii/S1525157816302239?via%3Dihub">
                      Joint Consensus Recommendation by AMP, ASCO and CAP
                    </Linkout>{' '}
                    and the{' '}
                    <Linkout link="https://academic.oup.com/annonc/article/29/9/1895/5076792?searchresult=1">
                      ESMO Scale for Clinical Actionability of molecular Targets
                      (ESCAT)
                    </Linkout>
                  </li>
                  <li>
                    To reflect the clinical data that demonstrates patients with
                    investigational predictive biomarkers for a specific tumor
                    type based on compelling clinical evidence (currently Level
                    3A) are more likely to experience clinical benefit compared
                    to patients with predictive biomarkers that are considered
                    standard care in a different tumor type (previously Level
                    2B, now combined into Level 3B).
                  </li>
                </ol>
              </div>
            </NewsList>
            <NewsList date={'12122019'} />
            <NewsList date={'12092019'}>
              <span>
                We now require user logins for access to downloadable data files
                and API. OncoKB will continue to be accessible for no fee for
                research use in an academic setting, but a license will be
                required to use OncoKB for commercial and/or clinical purposes.
                Fees will be used to support future development and maintenance
                of OncoKB. Please visit the{' '}
                <Link to={PAGE_ROUTE.REGISTER}>registration page</Link>.
              </span>
            </NewsList>
            <NewsList date={'08282019'} />
            <NewsList date={'08042019'} />
            <NewsList date={'06212019'} />
            <NewsList date={'05092019'} />
            <NewsList date={'01242019'} />
            <NewsList date={'12142018'} />
            <NewsList date={'11022018'} />
            <NewsList date={'10262018'} />
            <NewsList date={'10012018'} />
            <NewsList date={'08202018'} />
            <NewsList date={'07122018'} />
            <NewsList date={'02022018'} />
            <NewsList date={'10262017'} />

            <h3>{getNewsTitle('08172017')}</h3>
            <div>
              <b>
                The following FDA-approvals have been incorporated into the
                Actionable Genes table:
              </b>
              <ul>
                {getNews({
                  key: 'news-08172017',
                  content: NEWS_BY_DATE['08172017'].news
                })}
              </ul>
            </div>

            <NewsList date={'08022017'} />
            <NewsList date={'05152017'} />
            <NewsList date={'04052017'} />
            <NewsList date={'03072017'} />
            <NewsList date={'12292016'} />
            <NewsList date={'11222016'} />
            <NewsList date={'10242016'} />
            <NewsList date={'09162016'} />
            <NewsList date={'08102016'} />
            <NewsList date={'07062016'} />

            <h3>{getNewsTitle('07062016')}</h3>
            <div>
              <b>Improved clinical annotations:</b>
              <ul>
                {getNews({
                  key: 'news-07062016',
                  content: NEWS_BY_DATE['07062016'].news
                })}
              </ul>
            </div>
          </div>
          <h3>Jun 6, 2016</h3>
          <div>
            <p>
              We are happy to announce the <b>first release of OncoKB</b>, a
              knowledge base for precision medicine. Our goal is to
              comprehensively annotate the oncogenic effect of mutations
              observed in cancer, as well as their therapeutic implications.
              This release contains information about almost 3,000 alterations
              in 418 cancer genes. For each alteration, we categorize the
              biological and clinical effect, along with citations of the source
              of the information, and, when available, the therapeutic
              implications of a alteration. We have focussed on FDA-approved
              (Level 1) or guideline-listed (Level 2) biomarkers, as well as
              biomarkers that with clinical evidence for sensitivity and for
              which therapies are currently explored in clinical trials (Level
              3). See the Levels of Evidence and Actionable Genes pages for more
              information.
            </p>
            <p>
              We have also{' '}
              <b>
                integrated information from OncoKB into the cBioPortal for
                Cancer Genomics
              </b>
              . When exploring alterations in{' '}
              <a
                href="http://www.cbioportal.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                cbioportal.org
              </a>
              , you will see annotations from OncoKB when available.{' '}
              <a
                href="http://www.cbioportal.org/case.do?cancer_study_id=luad_tcga_pub&sample_id=TCGA-49-4494-01"
                target="_blank"
                rel="noopener noreferrer"
              >
                Example of a lung cancer case.
              </a>
            </p>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}