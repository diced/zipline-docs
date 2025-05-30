# zipline-docs/sidebar-gen

work in progress sidebar.json generator made in go

why? because the old node version took 1 second on each run which is too slow.

it now runs in less than 80ms on a M4 Pro

there are probably some better optimizations but it's just ported over from the old code and adds in a new concurrent thing to make it way faster.