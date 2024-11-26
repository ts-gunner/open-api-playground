import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright="@2024 0.0.1 接口管理平台"
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Open API Center',
          title: 'Open API Center',
          href: 'https://github.com/ts-gunner/open-api-center',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: '#',
          blankTarget: true,
        },
        {
          key: 'Open API Controller',
          title: 'Open API Controller',
          href: 'https://github.com/ts-gunner/open-api-controller',
          blankTarget: true,
        },
        {
          key: 'a',
          title: '|',
          href: '#',
          blankTarget: false,
        },
        {
          key: 'Open API Playground',
          title: 'Open API Playground',
          href: 'https://github.com/ts-gunner/open-api-playground',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
