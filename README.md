![Dogtalk](http://sockethub.org/img/dogtalk-logo.svg)

An light-weight messaging client, built with [Sockethub](http://sockethub.org) and [remoteStorage](http://remotestorage.io).


## About

Dogtalk aims to be a multi-protocol chat application designed to be fully [Unhosted](http://unhosted.org), relying on Sockethub for it's messaging capabilities, and [remoteStorage](http://remotestorage.io), for it's data storage.

The supported protocols will be: XMPP, IRC, Facebook, Twitter.

However inially the focus is just on XMPP and IRC. 


## Current Status

**still under development**

Platforms:
XMPP: sending and receiving is implemented. TODO: presence, chat status, add/remove from buddy list, multi-accounts
IRC: not implemented
Facebook: not implemented
Twitter: not implemented

## Installation

There is no production build for Dogtalk right now. Currently the only way to use it is from a cloned repository.

### Prerequisites

#### Sockethub

**you must have a Sockethub instance running for Dogtalk to connect to**

For instructions on installing Sockethub, please see the [Sockethub README](http://github.com/sockethub/sockethub/)


### Dogtalk

    $ git clone https://github.com/sockethub/dogtalk-new.git

    $ cd dogtalk-new/

    $ npm install
    
    $ bower install
    
    $ grunt serve

The above set of commands will check out the latest clone, and run a simple http server to access Dogtalk from your browser.

From a browser you should now be able to access: ```http://localhost:9000```

