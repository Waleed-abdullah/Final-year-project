import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session.user object from next-auth
   */
  interface User {
    isNewUser: boolean;
    provider: string;
    is_verified: boolean;
  }

  /**
   * Extends the built-in session object from next-auth
   */
  interface Session {
    user: {
      isNewUser: boolean;
      email: string;
      image: string;
      provider: string;
      is_verified: boolean;
    };
  }
}
