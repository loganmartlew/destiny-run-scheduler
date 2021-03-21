/*
Use firebase userid for db userid
Possibly switch to auth on backend

Login:
get a user from /users/:userid

Signup:
create a user with name and email in body at /users

Dashboard:
get schedule previews by userid at /schedules/preview?userid={userid}

create schedule with name and userid at /schedules
delete schedule with scheduleid at /schedules

Schedule page:
get full schedule data by scheduleid from /schedules/:scheduleid
*/

export interface api {
  users: {
    post: {
      request: {
        name: string;
        email: string;
      };
      response: {
        user: {
          name: string;
          email: string;
        };
      };
      action: 'Creates a new user record in the database';
    };

    ['id']: {
      get: {
        request: {
          ['id']: string;
        };
        response: {
          user: {
            name: string;
            email: string;
          };
        };
        action: 'Retrieves a user record from the database';
      };
    };
  };

  schedules: {
    get: {
      request: {
        userid: string;
        authtoken: string;
      };
      response: {
        schedules: any[];
      };
      action: 'Retrieves all schedules that include the user specified from the database';
    };

    post: {
      request: {
        name: string;
        userid: string;
      };
      response: {
        schedule: {
          name: string;
        };
      };
      action: 'Creates a new schedule record in the database';
    };

    ['id']: {
      get: {
        request: {
          ['id']: string;
          authtoken: string;
        };
        response: {
          schedule: {
            name: string;
          };
        };
        action: 'Retrieves a schedule record from the database';
      };
    };

    preview: {
      get: {
        request: {
          userid: string;
          authtoken: string;
        };
        response: {
          schedule: {
            name: string;
          };
        };
        action: 'Retrieves a preview of a schedule record from the database (only name and users)';
      };
    };
  };
}
