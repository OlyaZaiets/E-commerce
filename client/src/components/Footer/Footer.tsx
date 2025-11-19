import { GithubLogo, LinkedinLogo } from 'phosphor-react';
import './Footer.scss'; 

export const Footer = () => {
return(
  <div className="footer-container">
    <div className='container footer-inner'>
      <h2 className='footer-title'>Contact Information</h2>
      <div className='footer-info-container'>
        <div className='contact-info'>
          <LinkedinLogo className='contact-info-LinkedIn' size={32} />
          <a 
            href="https://www.linkedin.com/in/olga-zaiets-009a261ab/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to my LinkedIn
          </a>

          <GithubLogo className='contact-info-github' size={32} />
          <a 
            href="https://github.com/OlyaZaiets"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to my GitHub 
          </a>
        </div>
        <div className='dev-info'>
          <h3>Developed by Olga Zaiets</h3>
          <h3>2025 Ukrainian Taste Project</h3>
        </div>
      </div>

    </div>
  </div>
)
}