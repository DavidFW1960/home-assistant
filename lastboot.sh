#!/bin/bash
# who -b | awk -F'( |,|:|-)+' '{print $6"/"$5"/"$4", "$7":"$8}'
uptime --since | awk -F'( |,|-)+' '{print $3"/"$2"/"$1", "$4}'