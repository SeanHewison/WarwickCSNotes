A **graph** is a set of things together with a set of connections between them. Formally, a graph is a pair $G = (V, E)$ where $V$ is a set of **vertices** (also called **nodes**) and $E$ is a set of **edges**, each edge being an unordered pair $\{u, v\}$ of distinct vertices.

Because $E$ is a *set* of *unordered* pairs, two things follow immediately: an edge $\{u, v\}$ is the same edge as $\{v, u\}$, and you can't have the same edge twice. This is just the behaviour of sets from [Sets](/resources/Notes/CS130/Sets) showing up again.

## An Example

Let $V = \{a, b, c, d\}$ and $E = \{\{a,b\}, \{b,c\}, \{a,c\}, \{c,d\}\}$. Drawing it:

```tikz
\begin{tikzpicture}[vertex/.style={circle, draw, semithick, fill=gray!10, minimum size=2em, inner sep=1pt, font=\small}]
\node[vertex] (a) at (0, 1.9) {$a$};
\node[vertex] (b) at (1.9, 1.9) {$b$};
\node[vertex] (c) at (1.9, 0) {$c$};
\node[vertex] (d) at (3.8, 0) {$d$};
\draw (a) -- (b);
\draw (b) -- (c);
\draw (c) -- (a);
\draw (c) -- (d);
\end{tikzpicture}
```

The picture is **not** the graph. Where you put the dots on the page is a choice; the graph is just the pair of sets. The same $G$ can be drawn in infinitely many ways, and two drawings that look nothing alike can be the same graph.

## Terminology

Let $G = (V, E)$ and take $u, v \in V$.

- $u$ and $v$ are **adjacent** (or **neighbours**) if $\{u, v\} \in E$.
- An edge $e = \{u, v\}$ is **incident** to $u$ and to $v$; $u$ and $v$ are the **endpoints** of $e$.
- The **neighbourhood** of $v$ is the set of its neighbours, $N(v) = \{u \in V : \{u,v\} \in E\}$.
- The **degree** of $v$, written $\deg(v)$, is the number of edges incident to $v$, i.e. $\deg(v) = |N(v)|$.
- A vertex of degree $0$ is **isolated**.

In the example above $\deg(a) = 2$, $\deg(b) = 2$, $\deg(c) = 3$ and $\deg(d) = 1$.

### The Handshake Lemma

Add those degrees up: $2 + 2 + 3 + 1 = 8$, and the graph has $4$ edges. That isn't a coincidence.

>[!info]- Prove that $\sum_{v \in V} \deg(v) = 2|E|$
> Count the pairs $(v, e)$ where $v$ is a vertex, $e$ is an edge, and $e$ is incident to $v$. Call the number of such pairs $N$, and count it two ways.
>
> **Group by vertex.** Each vertex $v$ appears in exactly $\deg(v)$ pairs, by the definition of degree. So $N = \sum_{v \in V} \deg(v)$.
>
> **Group by edge.** Each edge has exactly two endpoints, so each edge appears in exactly $2$ pairs. So $N = 2|E|$.
>
> Both are counts of the same set, so $\sum_{v \in V} \deg(v) = 2|E|$.
>
> This "count the same thing two ways" move is called **double counting**, and it's worth recognising: it turns a statement about a sum into a statement about a set, which is usually much easier to reason about.

A neat consequence: since $2|E|$ is even, **the number of vertices of odd degree must be even**. You cannot have a graph with exactly three odd-degree vertices. (The usual phrasing is that at a party, the number of people who have shaken hands an odd number of times is even.)

## Directed Graphs

If we let the edges be *ordered* pairs instead, we get a **directed graph** (or **digraph**): $G = (V, E)$ with $E \subseteq V \times V$. Now $(u, v)$ and $(v, u)$ are different edges, and $(v, v)$ — a **self-loop** — is allowed.

```tikz
\begin{tikzpicture}[vertex/.style={circle, draw, semithick, fill=gray!10, minimum size=2em, inner sep=1pt, font=\small}]
\node[vertex] (1) at (0, 1.8) {$1$};
\node[vertex] (2) at (2, 1.8) {$2$};
\node[vertex] (3) at (2, 0) {$3$};
\node[vertex] (4) at (0, 0) {$4$};
\draw[->, >=stealth', semithick] (1) -- (2);
\draw[->, >=stealth', semithick] (2) -- (3);
\draw[->, >=stealth', semithick] (1) -- (3);
\draw[->, >=stealth', semithick] (3) to[loop below] (3);
\end{tikzpicture}
```

Look at the definition again: $E \subseteq V \times V$. That is *exactly* the definition of a [relation](/resources/Notes/CS130/Relations) on $V$. A digraph on $V$ and a relation on $V$ are the same object written two different ways, so everything you know about relations transfers straight across.

>[!info]- What do the relation properties look like as pictures?
> Let $R$ be a relation on $V$, drawn as a digraph.
>
> | Property of $R$ | What you see in the drawing |
> | --- | --- |
> | Reflexive | Every vertex has a self-loop. |
> | Symmetric | Every arrow has a matching arrow back, so you may as well drop the arrowheads and draw an undirected graph. |
> | Antisymmetric | No pair of vertices has arrows both ways (self-loops are still fine). |
> | Transitive | Wherever you can follow two arrows $u \to v \to w$, the shortcut $u \to w$ is already drawn. |
>
> The digraph above is **not** reflexive (only $3$ has a loop), **not** symmetric ($1 \to 2$ with no $2 \to 1$), **is** antisymmetric, and **is** transitive — the only two-step path is $1 \to 2 \to 3$, and $1 \to 3$ is present.
>
> This is why an undirected graph is the natural picture of a *symmetric* relation, and why equivalence relations (reflexive, symmetric, transitive) draw as a collection of disjoint clumps with everything inside a clump joined to everything else.

## Some Named Graphs

A few families come up constantly, usually as examples, counterexamples, or the answer to "give a graph with property X".

- The **empty graph** $\overline{K_n}$ has $n$ vertices and no edges. Every vertex is isolated.
- The **complete graph** $K_n$ has $n$ vertices and *every* possible edge.
- The **path** $P_n$ is $n$ vertices in a line.
- The **cycle** $C_n$ is $n$ vertices in a ring ($n \geq 3$).

### Complete Graphs

$K_n$ is the graph on $n$ vertices in which every pair of distinct vertices is joined. Here is $K_4$:

```tikz
\begin{tikzpicture}[vertex/.style={circle, draw, semithick, fill=gray!10, minimum size=2em, inner sep=1pt, font=\small}]
\node[vertex] (v1) at (0, 2.2) {$v_1$};
\node[vertex] (v2) at (2.2, 2.2) {$v_2$};
\node[vertex] (v3) at (2.2, 0) {$v_3$};
\node[vertex] (v4) at (0, 0) {$v_4$};
\draw (v1) -- (v2);
\draw (v2) -- (v3);
\draw (v3) -- (v4);
\draw (v4) -- (v1);
\draw (v1) -- (v3);
\draw (v2) -- (v4);
\end{tikzpicture}
```

Drawing the four vertices as a square makes the two diagonals cross, but a crossing in a drawing is not a vertex — there is no fifth vertex in the middle. Again: the picture is not the graph.

Every vertex of $K_n$ is adjacent to all $n - 1$ others, so $\deg(v) = n - 1$ for every $v$.

>[!info]- How many edges does $K_n$ have?
> Try it with the handshake lemma before reading on.
>
> Every one of the $n$ vertices has degree $n-1$, so
> $$\sum_{v \in V} \deg(v) = n(n-1)$$
> and the handshake lemma says this equals $2|E|$. Therefore
> $$|E| = \frac{n(n-1)}{2}$$
>
> You can also get there directly: an edge is a choice of $2$ distinct vertices out of $n$ where order doesn't matter, which is $\binom{n}{2} = \frac{n(n-1)}{2}$. The two arguments agree, which is a good sign.
>
> Checking against the picture: $K_4$ should have $\frac{4 \cdot 3}{2} = 6$ edges. Count them — four round the outside, two diagonals.

A graph in which every vertex has the same degree $k$ is called **$k$-regular**, so $K_n$ is $(n-1)$-regular. $K_n$ also has the most edges any graph on $n$ vertices can have, since $E$ is a subset of the set of all pairs.

### Directed Versions of $K_4$

$K_n$ always means the *undirected* complete graph. There is no graph called "directed $K_n$", and that's not an oversight: "add directions to $K_4$" has two different sensible answers, so they get separate names.

**Put an arc both ways between every pair.** This is the **complete digraph**, written $\overleftrightarrow{K_n}$ (or $DK_n$). Every ordered pair of distinct vertices is an edge, so $|E| = n(n-1)$, twice the undirected count.

```tikz
\begin{tikzpicture}[vertex/.style={circle, draw, semithick, fill=gray!10, minimum size=2em, inner sep=1pt, font=\small}, arc/.style={->, >=stealth', semithick}]
\node[vertex] (v1) at (0, 3.1) {$v_1$};
\node[vertex] (v2) at (3.1, 3.1) {$v_2$};
\node[vertex] (v3) at (3.1, 0) {$v_3$};
\node[vertex] (v4) at (0, 0) {$v_4$};
\draw[arc] (v1) to[bend left=14] (v2);
\draw[arc] (v2) to[bend left=14] (v1);
\draw[arc] (v2) to[bend left=14] (v3);
\draw[arc] (v3) to[bend left=14] (v2);
\draw[arc] (v3) to[bend left=14] (v4);
\draw[arc] (v4) to[bend left=14] (v3);
\draw[arc] (v4) to[bend left=14] (v1);
\draw[arc] (v1) to[bend left=14] (v4);
\draw[arc] (v1) to[bend left=22] (v3);
\draw[arc] (v3) to[bend left=22] (v1);
\draw[arc] (v2) to[bend left=22] (v4);
\draw[arc] (v4) to[bend left=22] (v2);
\end{tikzpicture}
```

Each pair is joined by two arcs bowed apart so you can see both. All $12$ are there.

**Or pick one direction per edge.** This is an **orientation** of $K_4$, and an orientation of a complete graph is called a **tournament** — think of a round-robin where every pair plays once and exactly one of them wins, the arrow pointing from winner to loser. It keeps $K_4$'s $6$ edges, just with arrowheads.

```tikz
\begin{tikzpicture}[vertex/.style={circle, draw, semithick, fill=gray!10, minimum size=2em, inner sep=1pt, font=\small}, arc/.style={->, >=stealth', semithick}]
\node[vertex] (v1) at (0, 0) {$v_1$};
\node[vertex] (v2) at (2.4, 0) {$v_2$};
\node[vertex] (v3) at (4.8, 0) {$v_3$};
\node[vertex] (v4) at (7.2, 0) {$v_4$};
\draw[arc] (v1) -- (v2);
\draw[arc] (v2) -- (v3);
\draw[arc] (v3) -- (v4);
\draw[arc] (v1) to[bend right=32] (v3);
\draw[arc] (v2) to[bend right=32] (v4);
\draw[arc] (v1) to[bend right=48] (v4);
\end{tikzpicture}
```

Note that there is no *single* directed $K_4$ to draw: there are $2^6 = 64$ ways to orient the six edges, falling into $4$ genuinely different (non-isomorphic) tournaments. The one drawn above is a particular, very well-behaved choice — every arrow points rightwards.

Lining them up against the relation properties from [Relations](/resources/Notes/CS130/Relations):

| | Edges | As a relation on $V$ |
| --- | --- | --- |
| $K_4$ | $6$ undirected | Symmetric, irreflexive |
| $\overleftrightarrow{K_4}$ | $12$ arcs | Symmetric, irreflexive, every pair related |
| Tournament on $4$ | $6$ arcs | Antisymmetric, irreflexive, every pair comparable |

That last row is worth staring at. Antisymmetric, irreflexive, and every pair comparable is *almost* a strict total order — the only missing ingredient is transitivity.

>[!info]- Which tournaments are strict total orders?
> Exactly the **transitive** ones, and on any number of vertices there is only one of them up to relabelling.
>
> The tournament drawn above is transitive: the arcs are precisely the pairs $v_i \to v_j$ with $i < j$, so following $v_i \to v_j \to v_k$ gives $i < j < k$ and the shortcut $v_i \to v_k$ is present. It is the strict order $v_1 < v_2 < v_3 < v_4$ drawn out, and the left-to-right layout is the ranking.
>
> The other three tournaments on $4$ vertices all fail transitivity, and they fail it in the same way: each contains a **directed $3$-cycle**, some $a \to b \to c \to a$. In tournament language that's $a$ beats $b$, $b$ beats $c$, and $c$ beats $a$ — the round-robin with no undisputed winner. Transitivity is exactly the condition that rules those out, and a tournament with no directed $3$-cycle can always be laid out left-to-right as a ranking.
>
> So "is this competition's result a sensible ranking?" and "is this relation transitive?" are the same question.

### Bipartite Graphs

$G$ is **bipartite** if $V$ can be split into two disjoint sets $A$ and $B$ (so $A \cup B = V$ and $A \cap B = \emptyset$) such that every edge has one endpoint in $A$ and the other in $B$. No edge is allowed to sit inside $A$, or inside $B$.

The **complete bipartite graph** $K_{m,n}$ has $|A| = m$, $|B| = n$ and every one of the $mn$ possible crossing edges.

A useful fact to know: a graph is bipartite **if and only if** it contains no cycle of odd length. So $C_4$ is bipartite and $C_3$ (a triangle) is not — which also means $K_n$ is not bipartite for any $n \geq 3$, since it contains a triangle.

## Walks, Paths, and Connectivity

- A **walk** from $u$ to $v$ is a sequence of vertices starting at $u$ and ending at $v$ in which each consecutive pair is adjacent. Repeats are allowed.
- A **path** is a walk with no repeated vertices.
- A **cycle** is a walk that starts and ends at the same vertex, repeats no other vertex, and has length at least $3$.
- The **length** of a walk is its number of edges, not its number of vertices.

$G$ is **connected** if there is a path between every pair of vertices. Otherwise it splits into maximal connected pieces called **connected components**. The example graph at the top is connected; adding an isolated vertex $e$ would give two components.

>[!info]- If there's a walk from $u$ to $v$, is there a path from $u$ to $v$?
> Yes, and the argument is worth seeing because it's the standard way to turn a "something exists" statement into a stronger one.
>
> Suppose there is a walk from $u$ to $v$. Among all walks from $u$ to $v$, pick a **shortest** one (one exists: the lengths are natural numbers, and every non-empty set of naturals has a least element).
>
> Claim this shortest walk is a path. Suppose not: then some vertex $w$ appears twice, so the walk looks like
> $$u \;\leadsto\; w \;\leadsto\; w \;\leadsto\; v$$
> Cut out the section between the two visits to $w$. What's left is still a walk from $u$ to $v$, and it is strictly shorter — contradicting minimality.
>
> So the shortest walk has no repeated vertex, i.e. it is a path.

This means connectivity can be checked with walks, which are much easier to build (you can wander) than paths (you must not retrace).
