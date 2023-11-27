import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session.user object from next-auth
   */
  interface User {
    isNewUser?: boolean;
  }

  /**
   * Extends the built-in session object from next-auth
   */
  interface Session {
    isNewUser?: boolean;
  }
}
