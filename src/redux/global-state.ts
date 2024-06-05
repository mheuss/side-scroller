/*
  Notes for whomever reviews this code:
  I'm using Redux to manage global state. I freakin' love redux.

  Redux eases debugging, centralizes all state, scales well, is easy to test
  and is wicked, wicked cool.

  Right now this is kind of empty, because we aren't at the point yet where i
  need to manage lives, score, etc. But when we get there, this is where it will
  all be managed
 */

export interface IState {
  project: string;
}
