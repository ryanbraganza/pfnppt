$(document).ready(function() {
  AP.register({
    /**
     * Anytime an actionTarget is called, your app can register to it client-site
     * using this approach
     * Source is the key of the component the actionTarget was triggered from
     * Target is the actionTarget key
     * Context is all contextual informatin about the action
     * Parameters are all custom parameters passed to the actionTarget
     */
    'actionTarget-sendToDialog': function({ source, target, context, parameters }) {
      console.log(source, target);
      $('#cloudId').val(context.cloudId);
      $('#conversationId').val(context.conversationId);
      $('#userId').val(context.userId);
      if (parameters) $('#parameters').val(JSON.stringify(parameters));
      if (context.message) $('#message').val(JSON.stringify(context.message));
    },

    /** This is how you handle dialog buttons
     */
    'dialogAction-openSidebar': function() {
      //First, disable the buttons in the dialog
      AP.dialog.disableActions();

      //Then, do whatever you need to
      AP.auth.withToken(function(err, token) {
        $.ajax({
          type: 'POST',
          url: '/dialogs/dialog/handleButtonClickServerSide',
          headers: { Authorization: 'Bearer ' + token },
          dataType: 'json',
          success: function(data) {
            console.log('response from service: ' + JSON.stringify(data));
            AP.sidebar.open({ key: 'sidebar-showcase' });

            // finally, close the dialog
            AP.dialog.close();
          },
          error: function(data) {
            //do something with errors
            console.log('Error calling service: ' + data);
          },
        });
      });
    },

    'dialogAction-disableButton': function() {
      AP.dialog.disableActions();
      setTimeout(function() {
        AP.dialog.enableActions();
      }, 1000);
    },

    'dialogAction-closeDialog': function() {
      AP.dialog.close();
    },
  });
});
