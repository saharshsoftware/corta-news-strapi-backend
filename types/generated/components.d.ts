import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsImageDescription extends Schema.Component {
  collectionName: 'components_components_image_descriptions';
  info: {
    displayName: 'image_description';
    icon: 'alien';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    description: Attribute.Text;
    title: Attribute.String;
  };
}

export interface ComponentsImage extends Schema.Component {
  collectionName: 'components_components_images';
  info: {
    displayName: 'image';
    icon: 'collapse';
    description: '';
  };
  attributes: {
    project_image: Attribute.Media;
    project_name: Attribute.String;
    project_link: Attribute.String;
    project_desc: Attribute.RichText;
    client: Attribute.String;
    slug: Attribute.String;
  };
}

export interface ComponentsLanguage extends Schema.Component {
  collectionName: 'components_components_languages';
  info: {
    displayName: 'Language';
    description: '';
  };
  attributes: {
    code: Attribute.Enumeration<['EN', 'AR', 'ES', 'HI']>;
    name: Attribute.Enumeration<['Hindi', 'English', 'Arabic', 'Urdu']>;
  };
}

export interface ComponentsLocation extends Schema.Component {
  collectionName: 'components_components_locations';
  info: {
    displayName: 'social_links';
    description: '';
  };
  attributes: {
    twitter: Attribute.String;
    linkedIn: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
  };
}

export interface ComponentsLogo extends Schema.Component {
  collectionName: 'components_components_logos';
  info: {
    displayName: 'logo';
    icon: 'cursor';
  };
  attributes: {
    url: Attribute.Media;
  };
}

export interface ComponentsNavlinks extends Schema.Component {
  collectionName: 'components_components_navlinks';
  info: {
    displayName: 'pairs';
    icon: 'arrowRight';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    route: Attribute.String;
  };
}

export interface ComponentsOfferings extends Schema.Component {
  collectionName: 'components_components_offerings';
  info: {
    displayName: 'offerings';
    icon: 'database';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desc: Attribute.Text;
    image: Attribute.Media;
    route: Attribute.String;
  };
}

export interface ComponentsSubtitle extends Schema.Component {
  collectionName: 'components_components_subtitles';
  info: {
    displayName: 'subtitle';
    icon: 'bold';
    description: '';
  };
  attributes: {
    subtitle: Attribute.String;
    tagline: Attribute.Text;
  };
}

export interface LogoPartnerLogo extends Schema.Component {
  collectionName: 'components_logo_partner_logos';
  info: {
    displayName: 'partner_logo';
    icon: 'apps';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.image-description': ComponentsImageDescription;
      'components.image': ComponentsImage;
      'components.language': ComponentsLanguage;
      'components.location': ComponentsLocation;
      'components.logo': ComponentsLogo;
      'components.navlinks': ComponentsNavlinks;
      'components.offerings': ComponentsOfferings;
      'components.subtitle': ComponentsSubtitle;
      'logo.partner-logo': LogoPartnerLogo;
    }
  }
}
