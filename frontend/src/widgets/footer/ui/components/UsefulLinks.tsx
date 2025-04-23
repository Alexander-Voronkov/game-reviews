import {
  FooterColStyled,
  FooterHeaderStyled,
  FooterListStyled,
  FooterListItemStyled,
  FooterLinkStyled,
} from "../Footer.styled";

export const UsefulLinks = () => {
  return (
    <FooterColStyled>
      <FooterHeaderStyled>Useful links</FooterHeaderStyled>
      <FooterListStyled>
        <FooterListItemStyled>
          <FooterLinkStyled href="/games">Games</FooterLinkStyled>
        </FooterListItemStyled>
        <FooterListItemStyled>
          <FooterLinkStyled href="#">Profile</FooterLinkStyled>
        </FooterListItemStyled>
      </FooterListStyled>
    </FooterColStyled>
  );
};
