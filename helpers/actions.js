const { Document } = require('adf-builder');

const app_name = process.env.APP_NAME || 'Stride Reference App';

module.exports.actionCard = () => {
  let doc = new Document();

  let card = doc
    .applicationCard('Action Cards')
    .description('See the triple dot ( ellipsis) on this card for more actions.');

  //Call a service points to a target URL /action/reference-service
  card
    .action()
    .title('Call service')
    .target({ key: 'actionTarget-handleCardAction' });

  card
    .action()
    .title('Open dialog')
    .target({ key: 'actionTarget-sendToDialog' })
    .parameters({ 'custom-param-from-card': 'some value' });

  //Call a service, then open a dialog
  card
    .action()
    .title('Call service then open dialog')
    .target({ key: 'actionTarget-handleCardAction' })
    .parameters({ then: 'openDialog' });

  card.context(`${app_name}: Action cards example`).icon({
    url: 'https://image.ibb.co/fPPAB5/Stride_White_On_Blue.png',
    label: 'Stride',
  });

  return doc.toJSON();
};

module.exports.updateCard = () => {
  let doc = new Document();

  let card = doc
    .applicationCard('Incident #4253')
    .link('https://www.atlassian.com')
    .description('Something is broken');
  card
    .action()
    .title('Ack')
    .target({ key: 'actionTarget-updateCard' })
    .parameters({ incidentAction: 'ack' });
  card
    .action()
    .title('Resolve')
    .target({ key: 'actionTarget-updateCard' })
    .parameters({ incidentAction: 'resolve' });
  card.context('DevOps / Incidents').icon({
    url: 'https://image.ibb.co/fPPAB5/Stride_White_On_Blue.png',
    label: 'Stride',
  });

  return doc.toJSON();
};

module.exports.ackMessage = messageToAck => {
  messageToAck.content.unshift({
    type: 'paragraph',
    content: [{ type: 'text', text: 'You just triggered an action for:' }],
  });
};

module.exports.actionMarkMessage = () => {
  return {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: "Click to open the app's dialog",
            marks: [
              {
                type: 'action',
                attrs: {
                  title: 'open dialog',
                  target: {
                    key: 'actionTarget-sendToDialog',
                  },
                  parameters: {
                    'custom-param-from-actionmark': 'Some value',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  };
};

module.exports.messageWithInlineActions = () => {
  return {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'inlineExtension',
            attrs: {
              extensionType: 'com.atlassian.stride',
              extensionKey: 'actionGroup',
              parameters: {
                key: 'inline-action-group-key',
                actions: [
                  {
                    key: 'approve',
                    title: 'Approve',
                    appearance: 'primary',
                    action: {
                      target: {
                        key: 'actionTarget-handleInlineMessageAction',
                      },
                      parameters: {
                        uniqueId: 1,
                      },
                    },
                  },
                  {
                    key: 'reject',
                    title: 'Reject',
                    appearance: 'default',
                    action: {
                      target: {
                        key: 'actionTarget-handleInlineMessageAction',
                      },
                      parameters: {
                        uniqueId: 2,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  };
};

module.exports.inlineActionResponseMessage = (userId, reason) => {
  let approvalTxt = reason === 'approve' ? 'Approved by ' : 'Rejected by ';

  const doc = new Document();
  doc.paragraph().text('Do you approve?');
  doc
    .paragraph()
    .strong(approvalTxt)
    .mention(userId);
  return doc.toJSON();
};

module.exports.messageWithInlineSelect = () => {
  const document = {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'What should I do next?',
          },
          {
            type: 'inlineExtension',
            attrs: {
              extensionType: 'com.atlassian.stride',
              extensionKey: 'select',
              parameters: {
                key: 'nextAction',
                title: 'Select an action',
                source: 'custom',
                data: {
                  value: '',
                  options: [
                    {
                      value: 'openSidebar',
                      title: 'Open the showcase sidebar',
                    },
                    {
                      value: 'openDialog',
                      title: 'Open a dialog',
                    },
                    {
                      value: 'openHighlights',
                      title: 'Open room highlights',
                    },
                    {
                      value: 'openRoom',
                      title: 'Create and open a room',
                    },
                    {
                      value: 'openFiles',
                      title: 'Open room files and links',
                    },
                  ],
                },
                action: {
                  target: {
                    key: 'actionTarget-handleInlineMessageSelect',
                  },
                  parameters: {
                    key: 'nextAction',
                  },
                },
              },
            },
          },
        ],
      },
    ],
  };

  return document;
};

module.exports.inlineSelectResponseMessage = () => {
  const doc = new Document();
  doc.paragraph().text('Done. You can try again.');
  return doc.toJSON();
};
