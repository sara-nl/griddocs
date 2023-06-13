.. _picas-changes-1to3:

*********************
Picas Changes 1 to 3
*********************

The Picas server has been migrated from CouchDB version 1.7.1 to CouchDB version 3.3.2. The new CouchDB version offers new features and optimisations.
Here is a summary of some changes that may affect user functionalities. 

+---------------------+---------------------------------------------+-----------------------------------------------------------------------------------+
| Change              | CouchDB 1.x                                 | CouchDB 3.x                                                                       |
+=====================+=============================================+===================================================================================+
| Web interface       | Futon interface                             | Fauxton new enhanced interface                                                    |
+---------------------+---------------------------------------------+-----------------------------------------------------------------------------------+
| Views               | Views located on top right drop-down button | Views located in left pane under Design Documents                                 |
+---------------------+---------------------------------------------+-----------------------------------------------------------------------------------+
| Map/Reduce          | Located at top right 'reduce' checkbox      | 'Options', click radio button 'Reduce', select 'Group Level: Exact', hit Run Query|
+---------------------+---------------------------------------------+-----------------------------------------------------------------------------------+
| New account         | Sign up from web interface enabled          | Sign up from web interface disabled                                               |
+---------------------+---------------------------------------------+-----------------------------------------------------------------------------------+
| Password change     | Enabled from web interface                  | Only possible from command line                                                   |
+---------------------+---------------------------------------------+-----------------------------------------------------------------------------------+
| Remove documents    | Using purge function from couchdb           | Purge no longer supported. Use delete function                                    |
+---------------------+---------------------------------------------+-----------------------------------------------------------------------------------+
| Database compaction | Enabled for users from the web interface    | Disabled for users. Aplied from server configuration                              |
+---------------------+---------------------------------------------+-----------------------------------------------------------------------------------+
| Attachment size     | Configurable                                |  Maximum attachment size has been set to 1GiB per document                        |
+---------------------+---------------------------------------------+-----------------------------------------------------------------------------------+
