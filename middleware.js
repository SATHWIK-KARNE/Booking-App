export { default } from 'next-auth/middleware';

// these endpoints will only be accessible when logged in
// but if we go to these without loggedIn => redirects to signIn page
export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
