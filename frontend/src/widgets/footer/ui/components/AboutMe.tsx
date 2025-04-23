import {
  FooterColStyled,
  FooterHeaderStyled,
  FooterLinkStyled,
  FooterListItemStyled,
  FooterListStyled,
} from "../Footer.styled";

export const AboutMe = () => {
  return (
    <FooterColStyled>
      <FooterHeaderStyled>About me</FooterHeaderStyled>
      <FooterListStyled>
        <FooterListItemStyled>
          <FooterLinkStyled
            href="https://github.com/Alexander-Voronkov"
            target="blank"
          >
            Github
          </FooterLinkStyled>
        </FooterListItemStyled>
        <FooterListItemStyled>
          <FooterLinkStyled
            href="https://cv.djinni.co/d0/82819b4b072f5a97a82512bb7fb6b7/latest_resume.pdf"
            target="blank"
          >
            CV
          </FooterLinkStyled>
        </FooterListItemStyled>
        <FooterListItemStyled>
          <FooterLinkStyled
            href="https://github.com/Alexander-Voronkov?tab=repositories"
            target="blank"
          >
            Portfolio
          </FooterLinkStyled>
        </FooterListItemStyled>
      </FooterListStyled>
    </FooterColStyled>
  );
};
