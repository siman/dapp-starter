#!/bin/bash

PID_FILE="ganache.pid"
if [ -s "$PID_FILE" ]
then
  PREV_PID=$(cat $PID_FILE)
  echo "Ganache pid file found: $PID_FILE"
  echo "Stop Ganache: kill $PREV_PID"
  kill $PREV_PID
  rm $PID_FILE
fi
