import {Typography, Button, BasicLink} from '@ht6/react-ui';
import { StaticImage } from 'gatsby-plugin-image';
import { useState } from 'react';
import Highlight from '../../components/Highlight';
import PageSection from '../../components/PageSection';
import cx from 'classnames';
import InputButton from '../../components/InputButton';
import {
  container,
  text,
  root,
  headline,
  image,
  apply,
  textHighlight,
  ctaHeading,
  faqCta,
} from './Notify.module.scss';
import React from 'react';
import toast from "react-hot-toast";
import {ApiService, ApiServiceError} from "../../utils";
import TurnstileChallenge from '../../components/TurnstileChallenge';

const appsOpen = false;

function Notify() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const onSubmit = async () => {
    const id = toast.loading('Loading...');
    try {
      const { response } = ApiService.subscribe({
        email, captchaToken: token
      }, 'subscribe', 'reset');
      toast.success(await response, {id});
      setEmail('');
    } catch (err) {
      switch ((err as any).name) {
        case 'AbbortError':
          break;
        case 'ApiServiceError':
          toast.error((err as ApiServiceError).getHumanError(), { id });
          console.error(err);
          break;
        default:
          toast.error('Unexpected error. Please try again later', { id });
          console.error(err);
          break;
      }
    }
  };

  return (
    <PageSection className={root} containerClassName={container} id='notify'>
      <StaticImage
        src='../../images/Rocket.svg'
        alt='laptop'
        quality={100}
        className={image}
      />
      <div className={headline}>
        {
          appsOpen 
          ? 
          (<React.Fragment>
            <Typography
              className={cx(text, ctaHeading)}
              textColor='neutral-50'
              textType='heading2'
              as='h2'
            >
              Ready to be a&nbsp;
              <span className={textHighlight}>hacker?</span>
            </Typography>
            <Typography
            className={text}
            textColor='neutral-50'
            textType='p'
            as='p'
            >
              Let's hack, learn, collaborate, and meet new people. Applications close <span>[deadline here in format Month day]</span>
            </Typography>
          </React.Fragment>
          )
          :
          (<Typography
            className={cx(text, ctaHeading)}
            textColor='neutral-50'
            textType='heading2'
            as='h2'
          >
            Applications open&nbsp;
            <span className={textHighlight}>soon</span>
          </Typography>)
          
        }
        
      </div>
      {
        appsOpen ?
        (<Button
          href='https://dash.hackthe6ix.com'
          rel='noreferrer noopener'
          className={apply}
          target='_blank'
          as={BasicLink}
        >
          Apply Now
        </Button>)
        :
        (<React.Fragment>
          <InputButton
            label='Enter email'
            name='email'
            buttonText='Notify me'
            inputProps={{
              noBorder: true,
              opacity: 38,
              opacityOnHover: 50,
              placeHolderColor: "primary-50",
              textColor: "shades-0",
              required: true,
              value: email,
              type: 'email',
              onChange: (e) => setEmail(e.currentTarget.value)
            }}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
              return false;
            }}
           >
          </InputButton>
          <TurnstileChallenge onToken={(token) => setToken(token)}/>
          <Typography
          className={cx(text, faqCta)}
          textColor='neutral-50'
          textType='paragraph1'
          as='p'
        >
          Have questions? Check out our{' '}
          <BasicLink linkStyle='styled' href='#faq' className={textHighlight}>
            FAQ
          </BasicLink>{' '}
          section.
        </Typography>
        </React.Fragment>)
      }
      
    </PageSection>
  );
}

export default Notify;
