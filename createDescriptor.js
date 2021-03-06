module.exports = function(req) {
  return {
    baseUrl: `https://${req.headers.host}`,
    key: 'reference',
    lifecycle: {
      installed: '/lifecycle/installed',
      uninstalled: '/lifecycle/uninstalled',
    },
    modules: {
      'chat:bot': [
        {
          key: 'bot-1',
          mention: {
            url: '/bot/mention',
          },
          directMessage: {
            url: '/bot/directMessage',
          },
        },
      ],
      'chat:bot:messages': [
        {
          key: 'bot-message-weather',
          pattern: '.*weather.*',
          url: '/bot/weather',
        },
      ],
      'chat:inputAction': [
        {
          key: 'inputAction-openDialog',
          name: {
            value: 'Open dialog',
          },
          target: 'actionTarget-sendToDialog',
        },
      ],
      'chat:dialog': [
        {
          key: 'dialog-1',
          title: {
            value: 'App Dialog',
          },
          options: {
            size: {
              width: '500px',
              height: '500px',
            },
            primaryAction: {
              key: 'dialogAction-openSidebar',
              name: {
                value: 'Open Sidebar',
              },
            },
            secondaryActions: [
              {
                key: 'dialogAction-closeDialog',
                name: {
                  value: 'Close',
                },
              },
              {
                key: 'dialogAction-disableButton',
                name: {
                  value: 'Disable Button',
                },
              },
            ],
          },
          url: '/dialogs/dialog',
          authentication: 'jwt',
        },
        {
          key: 'dialog-configuration',
          title: {
            value: 'App Configuration',
          },
          options: {
            size: {
              width: '700px',
              height: '500px',
            },
            primaryAction: {
              key: 'dialogAction-saveConfiguration',
              name: {
                value: 'Save',
              },
            },
            secondaryActions: [
              {
                key: 'dialogAction-closeConfiguration',
                name: {
                  value: 'Close',
                },
              },
            ],
          },
          url: '/configurations/config',
          authentication: 'jwt',
        },
      ],
      'chat:sidebar': [
        {
          key: 'sidebar-showcase',
          name: {
            value: 'App Sidebar',
          },
          url: '/sidebars/sidebar/showcase',
          authentication: 'jwt',
        },
        {
          key: 'sidebar-watchMessages',
          name: {
            value: 'Watch messages',
          },
          url: '/sidebars/sidebar/watchMessages',
          authentication: 'jwt',
        },
      ],
      'chat:glance': [
        {
          key: 'glance-showcase',
          name: {
            value: 'API showcase',
          },
          icon: {
            url: '/public/img/logo.png',
            'url@2x': '/public/img/logo.png',
          },
          target: 'actionTarget-openSidebar-showcase',
          queryUrl: '/glances/glance/showcase/state',
          authentication: 'jwt',
        },
        {
          key: 'glance-watchMessages',
          name: {
            value: 'Watch Messages',
          },
          icon: {
            url: '/public/img/logo.png',
            'url@2x': '/public/img/logo.png',
          },
          target: 'actionTarget-openSidebar-watchMessages',
          queryUrl: '/glances/glance/watchMessages/state',
          authentication: 'jwt',
        },
      ],
      'chat:messageAction': [
        {
          key: 'messageAction-openDialog',
          name: {
            value: 'Send to dialog',
          },
          target: 'actionTarget-sendToDialog',
        },
        {
          key: 'messageAction-handleMessage',
          name: {
            value: 'Send to service',
          },
          target: 'actionTarget-handleMessage',
        },
      ],
      'chat:configuration': [
        {
          key: 'configuration-1',
          page: {
            target: 'dialog-configuration',
          },
          state: {
            url: '/configurations/config/state',
          },
          authentication: 'jwt',
        },
      ],
      'chat:webhook': [
        {
          key: 'webhook-conversations',
          event: 'conversation:updates',
          url: '/webhooks/conversationEvent',
        },
        {
          key: 'webhook-roster',
          event: 'roster:updates',
          url: '/webhooks/roster',
        },
      ],
      'chat:externalPage': [
        {
          key: 'externalPage-createStrideButton',
          url: '/lifecycle/createStrideButton',
        },
      ],
      'chat:actionTarget': [
        {
          key: 'actionTarget-openConfiguration',
          openDialog: {
            key: 'dialog-configuration',
          },
        },
        {
          key: 'actionTarget-openSidebar-showcase',
          openSidebar: {
            key: 'sidebar-showcase',
          },
        },
        {
          key: 'actionTarget-openSidebar-watchMessages',
          openSidebar: {
            key: 'sidebar-watchMessages',
          },
        },
        {
          key: 'actionTarget-openExternalPage-createStrideButton',
          openSidebar: {
            key: 'externalPage-createStrideButton',
          },
        },
        {
          key: 'actionTarget-sendToDialog',
          openDialog: {
            key: 'dialog-1',
          },
        },
        {
          key: 'actionTarget-handleCardAction',
          callService: {
            url: '/actions/action/handleCardAction',
          },
        },
        {
          key: 'actionTarget-handleMessage',
          callService: {
            url: '/actions/action/handleMessage',
          },
        },
        {
          key: 'actionTarget-updateCard',
          callService: {
            url: '/actions/action/updateCard',
          },
        },
        {
          key: 'actionTarget-handleInlineMessageSelect',
          callService: {
            url: '/actions/action/handleInlineMessageSelect',
          },
        },
        {
          key: 'actionTarget-handleInlineMessageAction',
          callService: {
            url: '/actions/action/handleInlineMessageAction',
          },
        },
      ],
    },
  };
};
