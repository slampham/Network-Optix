All the weird ways to make something invisible with CSS / JavaScript?
  display, visibility, opacity, translate (with x, y, or z-axis), width & height = 0, z-index

How to center something?
  flex, grid
  margin: auto auto
    What requirements before using margin? Element must have height / width defined
  display: absolute
    top: 50%; left: 50%; transform: translateX(50%), translateY(50%)

Scenario: say you had 5,000,000 users that client is requesting from server. Client complains response time is too slow. How to solve?
  Pagination: make each page grab only 50 users at a time per page

Followup: client says page is still slow because each user has 20 different badges being retrieved. How to solve?
  Combine the sprites into one image on the server. That way, the client makes only one request (the combined image) instead of 20 requests (all the badges).

Page lifecycle

What does this print?
  function foo(n) {
    console.log(greeting + ' ' + n)
    if (true) {
      var greeting = 'Hello'  // vs let greeting = 'Hello'
    }
    console.log(greeting + ' ' + n)
  }
  foo('Spencer')

  with 'var': 
    undefined Spencer
    Hello Spencer
  with 'let': 
    error. no printing

What does this evaluate to?
  '7' + 7
  '7' - 7
  '7' - '7'

Pass by value vs reference

Does destructuring use same object or make copy?
  Pass by reference so it uses same object

Closures

How to make true immutable constant in JavaScript?
  function foo(obj) {
    const immutable = obj
    const bar = () => {
      return immutable
    }
  }
  const immutable = foo(obj)

Promises, promise.all()

2sum (leetcode)



Behavioral:
  How do you approach testing a project? How do you deal with making sure a project is functional?
  Describe when a teammate caught a bug or mistake in your code.
  How do you make a sandwich? (explain like you're talking to an alien)
  How do you bench press? (explain like you're writing it down; you can't say you'll show your form)
