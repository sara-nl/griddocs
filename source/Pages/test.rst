====
Test
====


Code-block bash
---------------

.. code-block:: console
   :emphasize-lines: 3
   
   # Comment
     # Indented comment
   $test emphasize-lines
   $echo "Hallo Wereld!" $VAR \
     | grep .
   Hallo Wereld!


Code-block console
------------------

.. code-block:: console
   :emphasize-lines: 3

   #Comment
    # Indented comment
   $test emphasize-lines
   $echo "Hallo Wereld!" $VAR \
   $| grep .
   Hallo Wereld!


Code-block shell-session
------------------------

.. code-block:: shell-session
   :emphasize-lines: 3

   # Comment
     # Indented comment
   $test emphasize-lines
   $echo "Hallo Wereld!" $VAR \
     | grep .
   Hallo Wereld!


Code-block python console
-------------------------

Don't mind the syntax.

.. code-block:: pycon
   :emphasize-lines: 3

   # Comment
     # Indented comment
   $test emphasize-lines
   $echo "Hallo Wereld!" $VAR \
     | grep .
   Hallo Wereld!
   >>> echo "Hallo Wereld!" \
       | grep .
   Hallo Wereld!
