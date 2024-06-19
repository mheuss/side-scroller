Simple Side Scrolling Game for University of London Intro to Programming Course

Skip to the TLDR below if you want to skip the background:

I want to start off by saying that I am a senior software engineer who has been programming
professionally for 30+ years now.

The 90s were a wild time in our profession, with start ups popping up everywhere. 
I dropped out of college three times in those years and joined or started several
of them. The last time, when one of my businesses took off, I just never went back.

I had promised myself that I would fix that oversight one day, and here I am.

Since most of my academic work was so long ago it didn't fly when applying for UoL.
I was admitted on a performance basis, and this is one the classes I've been requested to take.

While I am a full stack developer - I do quite a bit of work in Javascript/Typescript
these days developing web applications in React/Tailwindcss. I've trained numerous
junior developers in how to use javascript, best practices in the industry, etc.

So far, I am having a blast. I haven't worked on a video game since the late nineties, when 
I was part of a small company that developed software for the nintendo 64. There is
a joy in this - and I am very grateful for the reintroduction of fun, straightforward 
and simple development. I've been writing billing and payment systems primarily in the 
last few years, with complex business processes, a multitude of microservices.. You get the idea.
Making a little dude run across the screen is such a nice change of pace.

----------
### TLDR;
----------

I need to warn you that I didn't just take the boilerplate provided by
the class - I created a React based application, using typescript, and using 
p5 wrapped by React.

When you are looking at the code here, you'll see that I've followed what are 
considered best practices in development: the code is broken down into modular
chunks and spread across many files. I used inheritance to segregate shared
functionality of my sprites and adhere to the DRY principle.

The emphasis is on ease of understanding, maintaining and extending the code. 

I used Typescript instead of Vanilla Javascript - typescript's typing helps
prevent mistakes and makes the code easier to read and understand.

To ease your job of grading this work, I've used extensive comments.

------------
### Where to start
------------

src/projects/side-scroller.tsx houses the main code. Start there.

------------
### Instructions for running.
------------

The application itself is deployed to https://mikeheuss.com. It is always
up-to-date as it auto deploys on commit. You can interact with the game
there.

If you want to run it locally, you need to have node installed - and since
you are developers who are knowledgeable in javascript, I am certain you do. 

So - as per the norm `npm run start` will get things up and running.

