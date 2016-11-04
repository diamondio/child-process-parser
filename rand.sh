count=1

while [ "$count" -le $1 ]      # Generate 10 ($MAXCOUNT) random integers.
do
  echo $RANDOM
  let "count += 1"  # Increment count.
done