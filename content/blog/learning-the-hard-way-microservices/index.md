---
title: 'Learning the hard way: Microservices'
subtitle: A retrospective on how I ignored the rules and regretted it
date: '2019-09-02T18:51:31.000Z'
---

In late 2016, my team and I started building a brand new platform. Having a
blank slate like this is a developer’s dream — no legacy code, no backward
compatibility to worry about, and best of all, we could choose The Right
Technology™ for the job.

Three years later, after much pain and suffering, I’m here to do a bit of a
retrospective. Before diving in though, I’m going to acknowledge two things.

* Hindsight is 20/20

* There is no silver bullet

There’s no way of knowing if doing things differently would have resulted in
less frustration, but there were definitely some key pieces of *very important*
advice around domain/architecture which we chose to ignore. At the time, we
thought we knew better.

So for those who are embarking on similar journeys, here are some of the
biggest pieces of advice I regret not taking.

## Ignored advice #1: Conway’s Law

[This law](https://en.wikipedia.org/wiki/Conway%27s_law) states that
inevitably, your system’s architecture will in some way resemble the
organisational structure of your company.

![Conway’s law](conway.png)

As our platform has evolved, we’ve written and operated between 30 and 40
microservices, depending on how you count. Not all still exist, some have been
rewritten in a different language, etc.

The catch is that since we started building, we were never more than a handful
of backend developers. Because we were always a small, close-knit team, each
developer would work on all the services. Architecture decisions were made as a
group, and being on call meant dealing with potential issues in any area.

As you can probably guess from the high service-developer ratio, we ended up
with lots of “separated” yet tightly-coupled services. This hurt us a lot.

Because of the coupling, there was an incessant temptation to reduce our
workload by “just” deploying cross-service changes at the same time, which
flies in the face of the [deploy
independently](https://youtu.be/PFQnNFe27kU?t=1352) principle.

## Ignored advice #2: You aren’t Google

![You vs Google](notgoogle_1.png)

One of the lesser benefits of microservices is that they can scale
independently. In our initial design, we had already separated components which
were expected to be bottlenecks at scale. Reality check: It turns out the scale
where this would matter is way beyond anything we are likely to encounter.

In fact, not only were we guessing about domain boundaries, but each service
also came with a certain amount of overhead. We run a collection of sidecar
containers and [Kubernetes
Daemonsets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
for operations functions (like monitoring and logging). It got to a point where
we were spending more resources on the supporting infrastructure than our
actual application. By a large amount.

Now, I’m not saying we’d be better off with a monolith, but if we had started
with a simpler architecture, we could have:

* Broken off pieces as we became more confident in the domain and found the
  right abstractions

* Gathered data around where the real performance bottlenecks were, if that
  even became a problem

* Saved a bunch of money by overlapping the supporting infrastructure

## Ignored advice #3: You still aren’t Google

![You vs Google](notgoogle_2.png)

Another benefit of microservices is the freedom to choose the best tool for the
job. We were experimenting with languages, and were running services written in
[Python](https://www.python.org/), [NodeJS](https://nodejs.org/en/) and
[Golang](https://golang.org). This was great in general, but became a nightmare
when writing shared libraries, since the same code had to be implemented in
three different languages.

I do believe in experimenting with different tools, but we ended up treating
everything as production-ready and long-lived. If you’re writing internal
shared libraries, the services using them are no longer an experiment.

I’ve had to come to terms with settling down with a single language. It turns
out that’s totally OK. Experiment as much as possible, but having a primary
stack which is repeatable and consistent is valuable too. This is even more
true if your services all operate under the same umbrella (e.g., web server
with database connection).

## Ignored advice #4: Everything is a trade-off

It turns out that a microservice architecture has a **lot** of downsides. I
won’t go into them here (others have [already done
that](https://martinfowler.com/articles/microservice-trade-offs.html)), but I
think it’s important to understand what you are signing up for.

If we had sat down and looked into the pros and cons, we would probably have
found that it would only start being worth it as we grew into multiple backend
teams, using different software to solve different problems.

![The journey to net-positive value](value_graph.png "The journey to
net-positive value")

## The punishment

We’ve spent time and effort going back the way we came. In January 2019, we
took a step back and looked for the biggest knot in our architecture. We
identified ten services which were coupled so tightly that bumping a single one
would collapse them all like a house of cards. We have since merged all ten to
be a single service, and haven’t looked back.

We’ve also slowly phased out our Python services, and all but one of our Golang
services. In some cases this has meant literal rewrites into NodeJS. We’re left
with a single set of shared JavaScript libraries to maintain.

## Learnings

If I could go back in time and give myself some warnings, I would say the
following:

* Design for the problems you know you have, and be very meticulous when
  guessing about the future.

* It’s safer to start with a few larger services and carve them up as the
  boundaries reveal themselves. A good rule of thumb is that one microservice
  is better than two unless you can articulate the reason for splitting them.
  Of course, there *are* many valid reasons, but make sure you know how they
  apply before going ahead.

* When experimenting and building MVP services, be very clear about what you
  *won’t* do and stick to that. It’s easy to get trapped into maintaining
  something which isn’t the right solution.
