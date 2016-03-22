#LRU Cache

I would like to try out implementing and experimenting with Caching algorithms. One of the most widespread and well known is the LRU (least recently used) cache optimization algorithm.

See here, for more cache algorithms, and related:
 * https://en.wikipedia.org/wiki/Cache_algorithms
 * https://en.wikipedia.org/wiki/Page_replacement_algorithm

## LRU
LRU is quite straightforward, as it may have its implementation quirks and speed of running drawbacks disregarded for now. I just want to focus on a simple implementation that does what it needs to: maintains a fixed upper size of data pointers, and replaces the ones that will not likely be used in the future (by this algorithm, that will be the least recently used ones).