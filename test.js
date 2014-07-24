Users = new Meteor.Collection("Users");

if (Meteor.isClient) {
  Meteor.subscribe("Users");
    
  Template.home.Users = function(){
    return Users.find().fetch(); 
  }

  Template.home.events({
    'click #adduser, keydown input': function (evt) {
      
      //bail early for keydowns that aren't enter key on our password box
      if (evt.type === "keydown" && evt.which != 13) return;
      
      // template data, if any, is available in 'this'
      Users.insert({name: $('#name').val(), password: $('#password').val()});
      $('#newUserForm input').val('');
      $('#name').focus();
    },
    
    'click .delUser':function(){
       Users.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    return Meteor.methods({
      removeUsers: function() {
        return Users.remove({});
      }
    });
  });
  
  Meteor.publish("Users", function () {
    return Users.find(); 
  });
}
