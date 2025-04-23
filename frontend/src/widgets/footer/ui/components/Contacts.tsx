import {
  FooterColStyled,
  FooterHeaderStyled,
  FooterListStyled,
  FooterListItemStyled,
  FooterLinkStyled,
} from "../Footer.styled";

export const Contacts = () => {
  return (
    <FooterColStyled>
      <FooterHeaderStyled>Contacts</FooterHeaderStyled>
      <FooterListStyled>
        <FooterListItemStyled>
          <FooterLinkStyled href="http://t.me/adema_deft">
            Telegram
          </FooterLinkStyled>
        </FooterListItemStyled>
        <FooterListItemStyled>
          <FooterLinkStyled href="mailto:pubgplayer29112004@gmail.com">
            Email
          </FooterLinkStyled>
        </FooterListItemStyled>
      </FooterListStyled>
    </FooterColStyled>
  );
};
