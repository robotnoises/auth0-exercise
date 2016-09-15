# Auth0 Documentation

## Suggestions

### Suggestion #1 - A walkthrough video series on how to integrate Auth0 into your Node application

In general, I think Auth0 could benefit from adding a lot more video content to the docs. At minimum, there should be a video series for each major programming language Auth0 supports, in which the presenter builds a new application in a way that covers all of the important subjects. Quickstarts are great, but video series can be just as "quick" while adding much more context to the app building experience.

[Here's an excellent one going over the basics of Sequelize](https://www.youtube.com/watch?v=qsDvJrGMSUY&list=PL5ze0DjYv5DYBDfl0vF_VRxEu8JdTIHlR)

### Suggestion #2 - A "Lesson Plan"-style Guide

The problem with any reference-style document is that the consumer of that document needs to have at least some knowledge of what they are looking for. Since the ultimate goal is to make it easy for brand new users to use Auth0, I think the best approach would be to create "Lesson Plans" for building applications as a companion to the API reference docs.

[Check out the Firebase legacy docs for Web here for a good example of what I'm referring to.](https://www.firebase.com/docs/web/guide/)

A User should read the reference docs, but a lesson plan will guarantee that they read everything they need to in the order they need it, even with zero knowledge of the product itself.

The reality is that there is a gap between "Getting Started" and "Building a real application." When the user reach that point, they will find themselves looking at this:

![](http://i.imgur.com/PZTpNXE.png)

Assuming the only thing they did was read the Quickstart, how will they know which of the white boxes to click? Which one first? A step-by-step lesson plan should liberate the User from having to make that decision.

### Suggestion #3 - "What's happening here?" callouts for each step of the Quickstart

I agree that a Quickstart Guide is supposed to be terse, but what ends up happening is the User finishes the guide without learning anything beyond how to build a very small seed application. Right now the format looks something like this:

> Step 3 - Secure your API

> Now, you need to specify one or more routes or paths that you want to protect, so that only users with the correct JWT will be able to do the request.

> app.use('/api/path-you-want-to-protect', jwtCheck);

... but it never explains what's actually happening in that jwtCheck middleware.

It would be helpful if there were a small explanation after completing the step plus a link to relevant in-depth documentation.

## Additional suggestions

* In general, more presence on important channels like Stack Overflow and Youtube.
* An Auth0 Yeoman generator for people who want to start a new project using Auth0
* Subheadings/steps on the Quickstart pages need to stand-out more. Bigger and bolder.
* The inline "Try" buttons that test endpoints [on this page](https://auth0.com/docs/api/management/v2) would be a killer feature if it didn't scroll to the top of the page after each test. This causes the user to have to scroll back each time they test an endpoint.
* You should definitely mention the API token generator in the NodeJS API Quickstart.
* Even more abstraction. If your end goal is to rapidly onboard new Users, you should provide SDKs with full API coverage.
