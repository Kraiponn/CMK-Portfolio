import React from 'react';

// CSS Frame Work
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// App Languages
import { EN_US_LOCALE_TYPE, enUs, th } from '@src/features/languages';

// Dashboard types
import {
  EDIT_PROPROFILE,
  EDIT_PASSWORD,
  ADD_USER,
} from '@src/utils/types/dashboard';

// State management
import { useAppDispatch, useAppSelector } from '@src/features/hooks/useStore';
import { selectedAccountMenu } from '@src/features/store/slices/dashboard';

interface Props {
  appLang: string;
  role: string;
  label: string;
  selected: boolean;
  itemNo: number;
  openSubMenu: boolean;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  iconColor?: 'primary' | 'secondary' | 'error';
  handleClickedMenu: (checkedNo: number) => void;
}

/***************************************************
 *                Main Function
 **************************************************/
const CMListAccountButtonMenu = ({
  appLang,
  role,
  label,
  selected,
  itemNo,
  Icon,
  iconColor,
  openSubMenu,
  handleClickedMenu,
}: Props) => {
  const dispatch = useAppDispatch();
  const { drawerListAccountMenu } = useAppSelector((state) => state.dashboard);

  const {
    dashboardPage: { drawerMenu },
  } = appLang === EN_US_LOCALE_TYPE ? enUs : th;
  const pageLangObj = drawerMenu.account;

  const handleSelectedItem = (itemSelect: string) => {
    switch (itemSelect) {
      case EDIT_PROPROFILE:
        dispatch(selectedAccountMenu(itemSelect));
        break;
      case EDIT_PASSWORD:
        dispatch(selectedAccountMenu(itemSelect));
        break;
      case ADD_USER:
        dispatch(selectedAccountMenu(itemSelect));
        break;
    }
  };

  return (
    <>
      <ListItemButton
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
          }}
        />
        {openSubMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleSelectedItem(EDIT_PROPROFILE)}
          >
            {drawerListAccountMenu.currentItem === EDIT_PROPROFILE ? (
              <ChevronRightIcon />
            ) : null}

            <ListItemText
              primary={pageLangObj.subMenu.editProfile}
              primaryTypographyProps={{
                fontFamily:
                  appLang === EN_US_LOCALE_TYPE
                    ? 'JosefinSans-Medium'
                    : 'Prompt-Regular',
              }}
            />
          </ListItemButton>

          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleSelectedItem(EDIT_PASSWORD)}
          >
            {drawerListAccountMenu.currentItem === EDIT_PASSWORD ? (
              <ChevronRightIcon />
            ) : null}

            <ListItemText
              primary={pageLangObj.subMenu.editPassword}
              primaryTypographyProps={{
                fontFamily:
                  appLang === EN_US_LOCALE_TYPE
                    ? 'JosefinSans-Medium'
                    : 'Prompt-Regular',
              }}
            />
          </ListItemButton>

          {role === 'Admin' && (
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => handleSelectedItem(ADD_USER)}
            >
              {drawerListAccountMenu.currentItem === ADD_USER ? (
                <ChevronRightIcon />
              ) : null}

              <ListItemText
                primary={pageLangObj.subMenu.addUser}
                primaryTypographyProps={{
                  fontFamily:
                    appLang === EN_US_LOCALE_TYPE
                      ? 'JosefinSans-Medium'
                      : 'Prompt-Regular',
                }}
              />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    </>
  );
};

export default CMListAccountButtonMenu;
