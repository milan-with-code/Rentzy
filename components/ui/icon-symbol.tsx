
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

import { ComponentProps } from 'react';
import { StyleProp, TextStyle, OpaqueColorValue } from 'react-native';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type FontAwesomeIconName = ComponentProps<typeof FontAwesome>['name'];
type IoniconsIconName = ComponentProps<typeof Ionicons>['name'];
type FeatherIconName = ComponentProps<typeof Feather>['name'];
type AntDesignIconName = ComponentProps<typeof AntDesign>['name'];
type EntypoIconName = ComponentProps<typeof Entypo>['name'];


type IconFamily =
  | 'MaterialIcons'
  | 'FontAwesome'
  | 'Ionicons'
  | 'Feather'
  | 'AntDesign'
  | 'Entypo';

type IconDefinition = {
  family: IconFamily;
  name:
  | MaterialIconName
  | FontAwesomeIconName
  | IoniconsIconName
  | FeatherIconName
  | AntDesignIconName
  | EntypoIconName;
};

type IconMapping = Record<string, IconDefinition>;

export type IconSymbolName = keyof typeof MAPPING;

export const MAPPING: IconMapping = {
  'house.fill': { family: 'MaterialIcons', name: 'home' },
  'paperplane.fill': { family: 'MaterialIcons', name: 'send' },
  'chevron.right': { family: 'MaterialIcons', name: 'chevron-right' },
  'chevron.left.forwardslash.chevron.right': {
    family: 'MaterialIcons',
    name: 'code',
  },
  'building-on': { family: 'MaterialIcons', name: 'apartment' },
  'inventory-material': { family: 'MaterialIcons', name: 'inventory' },
  'bed.double.fill': { family: 'MaterialIcons', name: 'bed' },
  'plus.circle.fill': { family: 'MaterialIcons', name: 'add-circle' },
  'person.3.fill': { family: 'MaterialIcons', name: 'group' },
  'person.crop.circle.fill': {
    family: 'MaterialIcons',
    name: 'account-circle',
  },
  'arrow.back': { family: 'MaterialIcons', name: 'arrow-back' },
  'arrow.forward': { family: 'MaterialIcons', name: 'arrow-forward' },

  'user.plus.fill': { family: 'Feather', name: 'user-plus' },
  'storefront': { family: 'Ionicons', name: 'storefront' },
  'edit.icon': { family: 'Entypo', name: 'edit' },
  'share.icon': { family: 'Entypo', name: 'share' },
  'arrow.back.icon': { family: 'Ionicons', name: 'arrow-back' },
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  const icon = MAPPING[name];

  if (!icon) return null;

  switch (icon.family) {
    case 'FontAwesome':
      return (
        <FontAwesome
          name={icon.name as FontAwesomeIconName}
          size={size}
          color={color}
          style={style}
        />
      );

    case 'Ionicons':
      return (
        <Ionicons
          name={icon.name as IoniconsIconName}
          size={size}
          color={color}
          style={style}
        />
      );

    case 'Feather':
      return (
        <Feather
          name={icon.name as FeatherIconName}
          size={size}
          color={color}
          style={style}
        />
      );

    case 'AntDesign':
      return (
        <AntDesign
          name={icon.name as AntDesignIconName}
          size={size}
          color={color}
          style={style}
        />
      );

    case 'Entypo':
      return (
        <Entypo
          name={icon.name as EntypoIconName}
          size={size}
          color={color}
          style={style}
        />
      );
    default:
      return (
        <MaterialIcons
          name={icon.name as MaterialIconName}
          size={size}
          color={color}
          style={style}
        />
      );
  }
}
