import React from 'react';

// CSS Frame Work
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// App Languages
import { EN_US_LOCALE_TYPE } from '@src/features/languages';

interface Props {
  appLang: string;
  label: string;
  selected: boolean;
  itemNo: number;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  iconColor?: 'primary' | 'secondary' | 'error';
  handleClickedMenu: (checkedNo: number) => void;
}

/***************************************************
 *                Main Function
 **************************************************/
const CMListItemButton = ({
  appLang,
  label,
  selected,
  itemNo,
  Icon,
  iconColor,
  handleClickedMenu,
}: Props) => {
  return (
    <ListItem
      button
      // color="primary"
      selected={selected}
      onClick={() => handleClickedMenu(itemNo)}
    >
      <ListItemIcon>
        <Icon color={iconColor ? `${iconColor}` : `inherit`} />
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          fontFamily:
            appLang === EN_US_LOCALE_TYPE
              ? 'JosefinSans-Medium'
              : 'Prompt-Regular',
          // fontWeight: 'bold',
        }}
      />
    </ListItem>
  );
};

export default CMListItemButton;
