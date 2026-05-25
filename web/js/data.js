const DAYS = [
  {id:"day-1",code:"J1",title:"Jour 1 - SELECT & WHERE",sub:"Lire et filtrer les donnees",
    why:"90% du SQL en pratique = lire et filtrer. C'est le b.a.-ba.",
    tags:["SELECT","WHERE","filtering"],
    sections:[
      {h:"SELECT basique",
        blocks:[
          {p:"<code>SELECT</code> = quelles colonnes ? <code>FROM</code> = quelle table ? <code>WHERE</code> = quelle condition ?"},
          {code:"-- Toutes les colonnes\nSELECT * FROM users;\n\n-- Colonnes choisies\nSELECT id, name, email FROM users;\n\n-- Avec filtre\nSELECT name, age\nFROM users\nWHERE age >= 18;\n\n-- Filtres combines\nSELECT name\nFROM users\nWHERE age >= 18\n  AND country = 'FR'\n  AND active = TRUE;"},
          {warn:"<code>SELECT *</code> en production = mauvais. Toujours nommer les colonnes (perf + clarte)."}
        ]
      },
      {h:"Operateurs WHERE",
        blocks:[
          {table:[
            ["Operateur","Sens","Exemple"],
            ["<code>=</code>","Egal","<code>WHERE id = 5</code>"],
            ["<code>&lt;&gt;</code> ou <code>!=</code>","Different","<code>WHERE status &lt;&gt; 'closed'</code>"],
            ["<code>BETWEEN</code>","Plage","<code>WHERE age BETWEEN 18 AND 65</code>"],
            ["<code>IN</code>","Dans une liste","<code>WHERE city IN ('Paris','Lyon')</code>"],
            ["<code>NOT IN</code>","Hors liste","<code>WHERE city NOT IN ('Paris')</code>"],
            ["<code>LIKE</code>","Pattern","<code>WHERE name LIKE 'Mar%'</code>"],
            ["<code>IS NULL</code>","Est null","<code>WHERE deleted_at IS NULL</code>"],
            ["<code>IS NOT NULL</code>","Pas null","<code>WHERE email IS NOT NULL</code>"]
          ]},
          {tip:"<code>= NULL</code> ne marche PAS. Utilise <code>IS NULL</code> / <code>IS NOT NULL</code>."}
        ]
      },
      {h:"AND, OR, NOT",
        blocks:[
          {code:"-- AND : toutes les conditions vraies\nWHERE age > 18 AND country = 'FR'\n\n-- OR : au moins une vraie\nWHERE country = 'FR' OR country = 'BE'\n\n-- NOT\nWHERE NOT (status = 'closed')\n\n-- Mix avec parentheses (priorite)\nWHERE (country = 'FR' OR country = 'BE')\n  AND age >= 18"},
          {warn:"Sans parentheses, <code>AND</code> est plus prioritaire que <code>OR</code>. <code>A OR B AND C</code> = <code>A OR (B AND C)</code>. Mets toujours les parentheses pour clarifier."}
        ]
      },
      {h:"LIKE et wildcards",
        blocks:[
          {table:[
            ["Wildcard","Sens","Exemple"],
            ["<code>%</code>","0 ou plus caracteres","<code>'Mar%'</code> → Marc, Marie..."],
            ["<code>_</code>","Exactement 1 caractere","<code>'_at'</code> → cat, bat..."],
            ["<code>[...]</code>","Liste (SQL Server)","<code>'[abc]%'</code>"],
            ["<code>ILIKE</code>","Insensible casse (PostgreSQL)","<code>name ILIKE 'mar%'</code>"]
          ]}
        ]
      }
    ],
    quiz:[
      {q:"Comment trouver les utilisateurs sans email ?",
        opts:["<code>WHERE email = NULL</code>","<code>WHERE email IS NULL</code>","<code>WHERE email = ''</code>","<code>WHERE !email</code>"],correct:"b",
        expl:"NULL est un etat special. On ne le compare qu'avec <code>IS NULL</code>."},
      {q:"Trouver les noms commencant par 'Mar' :",
        opts:["<code>name = 'Mar*'</code>","<code>name LIKE 'Mar%'</code>","<code>name LIKE 'Mar_'</code>","<code>name STARTS 'Mar'</code>"],correct:"b",
        expl:"<code>%</code> = 0 ou plus caracteres. <code>_</code> = exactement un."},
      {q:"Difference entre <code>NULL</code> et chaine vide :",
        opts:["Aucune","NULL = absence de valeur, '' = valeur vide","Inverse","NULL = 0"],correct:"b",
        expl:"<code>NULL</code> = on ne SAIT PAS. <code>''</code> = on sait que c'est vide. Deux choses differentes."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Tous les users",desc:"Selectionne id, nom et email de la table users.",
        sol:"SELECT id, name, email FROM users;"},
      {num:2,diff:"easy",title:"Majeurs FR",desc:"Users majeurs et francais.",
        sol:"SELECT name FROM users\nWHERE age >= 18 AND country = 'FR';"},
      {num:3,diff:"easy",title:"Differents pays",desc:"Users qui ne sont pas francais.",
        sol:"SELECT name FROM users\nWHERE country <> 'FR';"},
      {num:4,diff:"medium",title:"Emails Gmail",desc:"Users dont l'email finit par '@gmail.com'.",
        sol:"SELECT email FROM users\nWHERE email LIKE '%@gmail.com';"},
      {num:5,diff:"medium",title:"Sans pays defini",desc:"Users dont le champ country est NULL.",
        sol:"SELECT name FROM users WHERE country IS NULL;"},
      {num:6,diff:"medium",title:"Prix entre 10 et 50",desc:"Produits dont le prix est entre 10 et 50 euros.",
        sol:"SELECT name, price\nFROM products\nWHERE price BETWEEN 10 AND 50;"},
      {num:7,diff:"hard",title:"Plusieurs pays",desc:"Users francais, belges, ou suisses.",
        sol:"SELECT name FROM users\nWHERE country IN ('FR', 'BE', 'CH');"},
      {num:8,diff:"hard",title:"Combinaison complexe",desc:"Produits actifs, prix > 0, hors categorie 'archive'.",
        sol:"SELECT name FROM products\nWHERE active = TRUE\n  AND price > 0\n  AND category <> 'archive';"}
    ]
  },

  {id:"day-2",code:"J2",title:"Jour 2 - ORDER, LIMIT, DISTINCT",sub:"Trier, limiter, dedupliquer",
    why:"Toujours utile : pagination, dashboards, top N.",
    tags:["ORDER BY","LIMIT","DISTINCT","OFFSET"],
    sections:[
      {h:"Trier les resultats",
        blocks:[
          {code:"-- ASC = ascendant (defaut)\nSELECT name, price FROM products\nORDER BY price ASC;\n\n-- DESC = descendant\nSELECT name, created_at FROM users\nORDER BY created_at DESC;\n\n-- Multi-criteres\nSELECT name, age FROM users\nORDER BY country ASC, age DESC;\n\n-- Trier par expression\nSELECT name, price * quantity AS total\nFROM products\nORDER BY total DESC;"}
        ]
      },
      {h:"LIMIT et OFFSET",
        blocks:[
          {code:"-- Top 10\nSELECT * FROM products\nORDER BY sales DESC\nLIMIT 10;\n\n-- Pagination : page 2 (20 elements par page)\nSELECT * FROM products\nORDER BY id\nLIMIT 20 OFFSET 20;\n\n-- Syntaxe MySQL alternative\nLIMIT 20, 20  -- offset 20, prendre 20"},
          {warn:"<code>LIMIT</code> sans <code>ORDER BY</code> = ordre NON GARANTI. Toujours combiner les deux pour la pagination."}
        ]
      },
      {h:"DISTINCT",
        blocks:[
          {code:"-- Liste unique des pays presents\nSELECT DISTINCT country FROM users;\n\n-- DISTINCT sur plusieurs colonnes (combinaison unique)\nSELECT DISTINCT city, country FROM users;\n\n-- Compter les valeurs uniques\nSELECT COUNT(DISTINCT country) FROM users;"}
        ]
      }
    ],
    quiz:[
      {q:"Page 3 d'une liste de 20 elements par page :",
        opts:["<code>LIMIT 20 OFFSET 60</code>","<code>LIMIT 20 OFFSET 40</code>","<code>LIMIT 60</code>","<code>LIMIT 3, 20</code>"],correct:"b",
        expl:"Page 3 = sauter 2 pages = OFFSET 40, puis prendre 20."},
      {q:"<code>ORDER BY price DESC</code> trie :",
        opts:["Croissant","Decroissant","Alphabetique","Aleatoire"],correct:"b",
        expl:"<code>DESC</code> = descendant. <code>ASC</code> = ascendant (defaut)."},
      {q:"Pour compter les valeurs uniques :",
        opts:["<code>COUNT(*)</code>","<code>COUNT(DISTINCT col)</code>","<code>UNIQUE COUNT</code>","<code>DISTINCT COUNT(col)</code>"],correct:"b",
        expl:"<code>COUNT(DISTINCT col)</code>."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Top 5 articles",desc:"Les 5 articles les plus chers.",
        sol:"SELECT name, price FROM products\nORDER BY price DESC\nLIMIT 5;"},
      {num:2,diff:"easy",title:"Users alphabetiques",desc:"Users tries par nom alphabetique.",
        sol:"SELECT name FROM users\nORDER BY name ASC;"},
      {num:3,diff:"medium",title:"Pays uniques tries",desc:"Liste alphabetique des pays presents.",
        sol:"SELECT DISTINCT country FROM users\nORDER BY country ASC;"},
      {num:4,diff:"medium",title:"Page 2 de produits",desc:"Page 2 de 25 produits (offset 25).",
        sol:"SELECT id, name FROM products\nORDER BY id\nLIMIT 25 OFFSET 25;"},
      {num:5,diff:"medium",title:"Tri multi-criteres",desc:"Users tries par pays puis age decroissant dans chaque pays.",
        sol:"SELECT name, country, age FROM users\nORDER BY country ASC, age DESC;"},
      {num:6,diff:"hard",title:"Top 3 par categorie",desc:"Les 3 produits les plus chers par categorie (utilise une variable).",
        sol:"-- Avec window function (PostgreSQL, MySQL 8+) :\nSELECT * FROM (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) AS rnk\n  FROM products\n) ranked\nWHERE rnk <= 3;"}
    ]
  },

  {id:"day-3",code:"J3",title:"Jour 3 - JOINs",sub:"INNER, LEFT, RIGHT, FULL, relations",
    why:"Toute appli reelle a plusieurs tables liees. JOIN = obligatoire.",
    tags:["JOIN","INNER","LEFT","relations"],
    sections:[
      {h:"INNER JOIN",
        blocks:[
          {p:"INNER JOIN = garde les lignes qui ont un match dans les DEUX tables."},
          {code:"-- Tous les users avec leurs commandes (n'affiche QUE les users qui ont commande)\nSELECT u.name, o.total, o.created_at\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id\nORDER BY o.created_at DESC;"},
          {tip:"Les alias (<code>u</code>, <code>o</code>) rendent la requete plus courte et lisible."}
        ]
      },
      {h:"LEFT JOIN",
        blocks:[
          {p:"LEFT JOIN = garde TOUS les users, meme ceux sans commande (NULL a droite pour les sans-match)."},
          {code:"-- Compter les commandes par user (meme ceux a 0)\nSELECT u.name, COUNT(o.id) AS nb_commandes\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name\nORDER BY nb_commandes DESC;"},
          {note:"<code>RIGHT JOIN</code> = inverse de LEFT. Rare en pratique : on inverse l'ordre des tables et on garde LEFT."}
        ]
      },
      {h:"Visualisation des JOINs",
        blocks:[
          {table:[
            ["JOIN","Garde"],
            ["<code>INNER</code>","Que les lignes avec match des 2 cotes"],
            ["<code>LEFT</code>","Toutes les lignes de gauche + match a droite (ou NULL)"],
            ["<code>RIGHT</code>","Toutes les lignes de droite + match a gauche (ou NULL)"],
            ["<code>FULL OUTER</code>","Tout, NULL ou se manque le match"],
            ["<code>CROSS</code>","Produit cartesien (TOUTES combinaisons)"]
          ]}
        ]
      },
      {h:"JOIN multiples",
        blocks:[
          {code:"-- Trois tables : users -> orders -> items\nSELECT u.name, o.id AS order_id, i.product_name, i.quantity\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id\nINNER JOIN order_items i ON i.order_id = o.id\nWHERE u.country = 'FR';"}
        ]
      },
      {h:"Self JOIN",
        blocks:[
          {p:"Joindre une table avec elle-meme. Classique pour les hierarchies (employees → manager)."},
          {code:"-- Chaque employee + son manager\nSELECT\n  e.name AS employee,\n  m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON m.id = e.manager_id;"}
        ]
      }
    ],
    quiz:[
      {q:"INNER JOIN exclut :",opts:["Les NULL","Les lignes sans correspondance","Les doublons","Rien"],correct:"b",
        expl:"INNER ne garde QUE ce qui matche des deux cotes."},
      {q:"Pour obtenir TOUS les users meme sans commande :",
        opts:["INNER","LEFT","RIGHT","CROSS"],correct:"b",
        expl:"LEFT JOIN garde tous les users de gauche."},
      {q:"Pour trouver les users SANS commande :",
        opts:["INNER JOIN","LEFT JOIN + WHERE o.id IS NULL","RIGHT JOIN","NOT JOIN"],correct:"b",
        expl:"LEFT JOIN + filtre WHERE o.id IS NULL = les sans-match cote droit."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Users + commandes",desc:"Nom de l'user + total de chacune de ses commandes.",
        sol:"SELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id;"},
      {num:2,diff:"medium",title:"Nombre commandes par user",desc:"Pour chaque user, compter ses commandes (0 inclus).",
        sol:"SELECT u.name, COUNT(o.id) AS nb\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name;"},
      {num:3,diff:"medium",title:"Users inactifs",desc:"Users qui n'ont JAMAIS commande.",
        sol:"SELECT u.name\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE o.id IS NULL;"},
      {num:4,diff:"hard",title:"Commandes avec articles",desc:"Pour chaque commande : user, produit, quantite.",
        sol:"SELECT u.name, o.id, i.product_name, i.quantity\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id\nINNER JOIN order_items i ON i.order_id = o.id;"},
      {num:5,diff:"hard",title:"Hierarchie employees",desc:"Chaque employee avec son manager.",
        sol:"SELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON m.id = e.manager_id;"}
    ]
  },

  {id:"day-4",code:"J4",title:"Jour 4 - GROUP BY & aggregates",sub:"COUNT, SUM, AVG, MIN, MAX, HAVING",
    why:"L'analyse de donnees = aggregation. Stats par categorie, par mois, par user.",
    tags:["GROUP BY","aggregates","HAVING","COUNT","SUM"],
    sections:[
      {h:"Fonctions d'aggregation",
        blocks:[
          {table:[
            ["Fonction","Fait quoi"],
            ["<code>COUNT(*)</code>","Compte les lignes"],
            ["<code>COUNT(col)</code>","Compte les non-NULL de col"],
            ["<code>COUNT(DISTINCT col)</code>","Compte les uniques"],
            ["<code>SUM(col)</code>","Somme"],
            ["<code>AVG(col)</code>","Moyenne"],
            ["<code>MIN(col)</code>","Minimum"],
            ["<code>MAX(col)</code>","Maximum"]
          ]}
        ]
      },
      {h:"GROUP BY",
        blocks:[
          {code:"-- Total commandes par user\nSELECT user_id, COUNT(*) AS nb, SUM(total) AS revenu\nFROM orders\nGROUP BY user_id;\n\n-- Par categorie de produit\nSELECT category,\n       COUNT(*) AS nb,\n       AVG(price) AS prix_moyen,\n       MIN(price) AS min_prix,\n       MAX(price) AS max_prix\nFROM products\nGROUP BY category\nORDER BY nb DESC;"},
          {warn:"Toute colonne dans le SELECT qui n'est PAS dans un aggregate doit etre dans le <code>GROUP BY</code>. Sinon erreur (ou comportement bizarre)."}
        ]
      },
      {h:"HAVING (filtrer apres aggregation)",
        blocks:[
          {p:"<code>WHERE</code> filtre AVANT aggregation. <code>HAVING</code> filtre APRES."},
          {code:"-- Categories avec plus de 10 produits ET prix moyen > 50\nSELECT category, COUNT(*) AS nb, AVG(price) AS prix_moy\nFROM products\nWHERE active = TRUE         -- filtre AVANT\nGROUP BY category\nHAVING COUNT(*) > 10        -- filtre APRES\n  AND AVG(price) > 50;"},
          {tip:"Ordre : <code>SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT</code>."}
        ]
      }
    ],
    quiz:[
      {q:"<code>WHERE</code> filtre :",opts:["Apres groupage","Avant groupage","Pendant","N'importe quand"],correct:"b",
        expl:"WHERE = avant GROUP BY. HAVING = apres."},
      {q:"Pour filtrer sur le resultat de COUNT() :",
        opts:["<code>WHERE COUNT(*) > 5</code>","<code>HAVING COUNT(*) > 5</code>","<code>FILTER COUNT(*)</code>","Impossible"],correct:"b",
        expl:"HAVING = filtre apres aggregation."},
      {q:"<code>COUNT(*)</code> vs <code>COUNT(col)</code> :",
        opts:["Identique","* inclut NULL, col exclut NULL","col inclut NULL, * exclut","Aucun sens"],correct:"b",
        expl:"<code>COUNT(*)</code> compte toutes les lignes. <code>COUNT(col)</code> ignore les NULL de col."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Total users",desc:"Compter tous les users.",
        sol:"SELECT COUNT(*) AS total FROM users;"},
      {num:2,diff:"easy",title:"Revenu total",desc:"Somme des totaux de toutes les commandes.",
        sol:"SELECT SUM(total) AS revenu_total FROM orders;"},
      {num:3,diff:"medium",title:"Stats par categorie",desc:"Par categorie : count, prix moyen, prix max.",
        sol:"SELECT category, COUNT(*) AS nb,\n       AVG(price) AS prix_moy,\n       MAX(price) AS prix_max\nFROM products\nGROUP BY category;"},
      {num:4,diff:"medium",title:"Top 5 acheteurs",desc:"5 users qui ont commande le plus en montant.",
        sol:"SELECT u.name, SUM(o.total) AS revenu\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name\nORDER BY revenu DESC\nLIMIT 5;"},
      {num:5,diff:"hard",title:"Filtre HAVING",desc:"Categories avec plus de 10 produits.",
        sol:"SELECT category, COUNT(*) AS nb\nFROM products\nGROUP BY category\nHAVING COUNT(*) > 10;"},
      {num:6,diff:"hard",title:"Commandes par mois",desc:"Nombre de commandes par mois (format YYYY-MM).",
        sol:"-- MySQL\nSELECT DATE_FORMAT(created_at, '%Y-%m') AS mois, COUNT(*) AS nb\nFROM orders\nGROUP BY mois\nORDER BY mois;\n\n-- PostgreSQL\nSELECT TO_CHAR(created_at, 'YYYY-MM') AS mois, COUNT(*) AS nb\nFROM orders\nGROUP BY mois\nORDER BY mois;"}
    ]
  },

  {id:"day-5",code:"J5",title:"Jour 5 - Subqueries & CTE",sub:"Requetes imbriquees, WITH",
    why:"Pour les requetes complexes lisibles. CTE > subquery imbriquee.",
    tags:["subqueries","CTE","WITH"],
    sections:[
      {h:"Subqueries",
        blocks:[
          {code:"-- Subquery dans WHERE\nSELECT name FROM users\nWHERE id IN (\n  SELECT user_id FROM orders WHERE total > 1000\n);\n\n-- Subquery dans SELECT\nSELECT name,\n  (SELECT COUNT(*) FROM orders WHERE user_id = u.id) AS nb_orders\nFROM users u;\n\n-- Subquery dans FROM\nSELECT * FROM (\n  SELECT user_id, SUM(total) AS revenu FROM orders GROUP BY user_id\n) sub\nWHERE revenu > 5000;"}
        ]
      },
      {h:"CTE (Common Table Expression)",
        blocks:[
          {p:"<code>WITH</code> = nommer une sous-requete pour la reutiliser. Plus lisible que les subqueries imbriquees."},
          {code:"WITH big_spenders AS (\n  SELECT user_id, SUM(total) AS revenu\n  FROM orders\n  GROUP BY user_id\n  HAVING SUM(total) > 5000\n)\nSELECT u.name, b.revenu\nFROM users u\nINNER JOIN big_spenders b ON b.user_id = u.id\nORDER BY b.revenu DESC;\n\n-- Plusieurs CTE chainees\nWITH\n  recent_orders AS (\n    SELECT * FROM orders WHERE created_at > '2026-01-01'\n  ),\n  fr_orders AS (\n    SELECT r.* FROM recent_orders r\n    INNER JOIN users u ON u.id = r.user_id\n    WHERE u.country = 'FR'\n  )\nSELECT * FROM fr_orders;"},
          {tip:"CTE = la voie moderne. Plus lisible, parfois optimise differemment par le moteur."}
        ]
      },
      {h:"EXISTS et NOT EXISTS",
        blocks:[
          {code:"-- Users qui ONT commande\nSELECT name FROM users u\nWHERE EXISTS (\n  SELECT 1 FROM orders WHERE user_id = u.id\n);\n\n-- Users qui n'ont JAMAIS commande\nSELECT name FROM users u\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders WHERE user_id = u.id\n);"},
          {tip:"<code>EXISTS</code> est souvent plus rapide que <code>IN</code> avec une sous-requete (court-circuit des le premier match)."}
        ]
      }
    ],
    quiz:[
      {q:"Une CTE est definie avec :",opts:["<code>SUB</code>","<code>WITH</code>","<code>CREATE TEMP</code>","<code>LET</code>"],correct:"b",
        expl:"<code>WITH name AS (...)</code>"},
      {q:"<code>EXISTS</code> retourne :",opts:["Une valeur","TRUE / FALSE","Une ligne","Une table"],correct:"b",
        expl:"<code>EXISTS</code> = boolean ; court-circuit au premier match."}
    ],
    exercises:[
      {num:1,diff:"medium",title:"Subquery IN",desc:"Users dont l'id apparait dans orders.",
        sol:"SELECT name FROM users\nWHERE id IN (SELECT DISTINCT user_id FROM orders);"},
      {num:2,diff:"medium",title:"Compter avec subquery",desc:"Chaque user + son nombre de commandes.",
        sol:"SELECT name,\n  (SELECT COUNT(*) FROM orders WHERE user_id = u.id) AS nb\nFROM users u;"},
      {num:3,diff:"hard",title:"CTE big spenders",desc:"Users avec total commandes > 5000.",
        sol:"WITH big_spenders AS (\n  SELECT user_id, SUM(total) AS revenu\n  FROM orders\n  GROUP BY user_id\n  HAVING SUM(total) > 5000\n)\nSELECT u.name, b.revenu\nFROM users u\nINNER JOIN big_spenders b ON b.user_id = u.id;"},
      {num:4,diff:"hard",title:"EXISTS non commande",desc:"Users qui n'ont jamais commande, avec EXISTS.",
        sol:"SELECT name FROM users u\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders WHERE user_id = u.id\n);"}
    ]
  },

  {id:"day-6",code:"J6",title:"Jour 6 - INSERT, UPDATE, DELETE",sub:"Ecrire dans la base, transactions",
    why:"Lire c'est bien, ecrire c'est obligatoire. Mais ATTENTION aux erreurs.",
    tags:["INSERT","UPDATE","DELETE","transactions"],
    sections:[
      {h:"INSERT",
        blocks:[
          {code:"-- Une ligne\nINSERT INTO users (name, email, age)\nVALUES ('Alice', 'alice@x.fr', 28);\n\n-- Plusieurs lignes\nINSERT INTO users (name, email) VALUES\n  ('Alice', 'alice@x.fr'),\n  ('Bob',   'bob@x.fr'),\n  ('Carla', 'carla@x.fr');\n\n-- INSERT depuis un SELECT\nINSERT INTO archived_users (id, name, email)\nSELECT id, name, email FROM users WHERE deleted_at IS NOT NULL;"},
          {tip:"Toujours nommer les colonnes apres <code>INSERT INTO table (...)</code>. Sinon, ajouter une colonne casse toutes tes requetes."}
        ]
      },
      {h:"UPDATE (DANGER)",
        blocks:[
          {code:"-- Avec WHERE (TOUJOURS)\nUPDATE users\nSET active = FALSE, deleted_at = NOW()\nWHERE id = 42;\n\n-- Multi-colonnes\nUPDATE products\nSET price = price * 1.10,\n    updated_at = NOW()\nWHERE category = 'premium';"},
          {bad:"UPDATE SANS WHERE = met a jour TOUTES les lignes de la table. C'est l'erreur n1 qui detruit des prods. TOUJOURS verifier ton WHERE avant."}
        ]
      },
      {h:"DELETE (DANGER ENCORE PLUS)",
        blocks:[
          {code:"-- TOUJOURS avec WHERE\nDELETE FROM users WHERE id = 42;\nDELETE FROM orders WHERE status = 'cancelled' AND created_at < '2025-01-01';"},
          {bad:"<code>DELETE FROM users</code> sans WHERE = VIDE LA TABLE. Une milliseconde, des annees de donnees disparues."},
          {tip:"Avant un DELETE risque : fais d'abord un <code>SELECT</code> avec le meme WHERE pour voir ce qui sera supprime. Ou utilise <code>BEGIN</code>/<code>ROLLBACK</code> (cf transactions)."}
        ]
      },
      {h:"Transactions",
        blocks:[
          {code:"-- Tout ou rien\nBEGIN;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- Si tout OK\nCOMMIT;\n\n-- Sinon\n-- ROLLBACK;"},
          {tip:"Une transaction garantit que TOUTES les operations reussissent, OU AUCUNE. Crucial pour les virements, paiements, etc."}
        ]
      }
    ],
    quiz:[
      {q:"<code>UPDATE users SET active = FALSE</code> sans WHERE :",
        opts:["Met a jour 0 ligne","Met a jour la 1ere ligne","Met a jour TOUTES les lignes","Erreur"],correct:"c",
        expl:"Sans WHERE, l'UPDATE touche TOUTE la table. CATASTROPHE."},
      {q:"Pour annuler une transaction en cours :",
        opts:["<code>CANCEL</code>","<code>ROLLBACK</code>","<code>UNDO</code>","<code>REVERT</code>"],correct:"b",
        expl:"<code>ROLLBACK</code> annule toutes les operations depuis le BEGIN."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Insert user",desc:"Insere ('Alice', 'a@x.fr', 28).",
        sol:"INSERT INTO users (name, email, age)\nVALUES ('Alice', 'a@x.fr', 28);"},
      {num:2,diff:"easy",title:"Update prix",desc:"Augmente de 10% tous les prix d'une categorie.",
        sol:"UPDATE products\nSET price = price * 1.10\nWHERE category = 'premium';"},
      {num:3,diff:"medium",title:"Soft delete",desc:"Marquer un user comme supprime (deleted_at = NOW) plutot que DELETE.",
        sol:"UPDATE users\nSET deleted_at = NOW()\nWHERE id = 42;"},
      {num:4,diff:"medium",title:"Multi insert",desc:"Insere 3 users en une seule requete.",
        sol:"INSERT INTO users (name, email) VALUES\n  ('Alice', 'a@x.fr'),\n  ('Bob',   'b@x.fr'),\n  ('Carla', 'c@x.fr');"},
      {num:5,diff:"hard",title:"Transaction virement",desc:"Transfere 100 du compte 1 vers le compte 2 (transaction).",
        sol:"BEGIN;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- Si tout va bien :\nCOMMIT;\n-- Si erreur, faire ROLLBACK;"},
      {num:6,diff:"hard",title:"Archive + delete",desc:"Copie les users supprimes vers archived_users, puis DELETE.",
        sol:"BEGIN;\n\nINSERT INTO archived_users (id, name, email, deleted_at)\nSELECT id, name, email, deleted_at FROM users\nWHERE deleted_at IS NOT NULL;\n\nDELETE FROM users WHERE deleted_at IS NOT NULL;\n\nCOMMIT;"}
    ]
  },

  {id:"day-7",code:"J7",title:"Jour 7 - Indexes & projet final",sub:"Performance, indexes, EXPLAIN",
    why:"Une base lente = une appli inutilisable. Les indexes = la cle.",
    tags:["indexes","performance","EXPLAIN","project"],
    sections:[
      {h:"Pourquoi un index",
        blocks:[
          {p:"Un INDEX = structure de donnees (B-tree) qui permet de trouver une ligne SANS scanner toute la table."},
          {code:"-- Sans index : sequential scan de la table entiere\nSELECT * FROM users WHERE email = 'alice@x.fr';\n-- Pour 1M lignes : peut prendre 1+ seconde\n\n-- Creer un index\nCREATE INDEX idx_users_email ON users(email);\n\n-- Maintenant : index scan, ~milliseconds"},
          {warn:"Trop d'indexes ralentit les INSERT/UPDATE/DELETE (faut maintenir les indexes). Indexer seulement ce qu'on RECHERCHE souvent."}
        ]
      },
      {h:"Quand creer un index",
        blocks:[
          {list:[
            "Colonnes utilisees dans <code>WHERE</code> souvent",
            "Colonnes de JOIN (foreign keys)",
            "Colonnes de <code>ORDER BY</code> frequent",
            "Tables avec beaucoup de lignes (>10k)",
            "PAS sur les petites tables (overhead inutile)",
            "PAS sur les colonnes a faible cardinalite (gender H/F)"
          ]}
        ]
      },
      {h:"Types d'indexes",
        blocks:[
          {code:"-- B-tree (defaut, le plus commun)\nCREATE INDEX idx_users_email ON users(email);\n\n-- Index unique (interdit les doublons + accelere)\nCREATE UNIQUE INDEX idx_users_email_uniq ON users(email);\n\n-- Index compose (ordre IMPORTANT)\nCREATE INDEX idx_orders_user_date\n  ON orders(user_id, created_at DESC);\n\n-- Index partiel (PostgreSQL)\nCREATE INDEX idx_active ON users(email) WHERE active = TRUE;"},
          {tip:"Index compose <code>(a, b)</code> sert aussi les requetes WHERE a = X (prefix), mais PAS WHERE b = X seul."}
        ]
      },
      {h:"EXPLAIN",
        blocks:[
          {code:"-- Voir le plan d'execution\nEXPLAIN SELECT * FROM users WHERE email = 'a@x.fr';\n\n-- PostgreSQL : version detaillee avec temps reel\nEXPLAIN ANALYZE SELECT * FROM users WHERE email = 'a@x.fr';"},
          {tip:"Si <code>Seq Scan</code> (table scan) sur une grosse table → manque d'index. Si <code>Index Scan</code> → bon."}
        ]
      },
      {h:"Projet final : schema d'un mini-blog",
        blocks:[
          {list:[
            "<strong>users</strong> : id (PK), email (UNIQUE), name, password_hash, created_at",
            "<strong>posts</strong> : id (PK), user_id (FK), title, body, published_at, created_at",
            "<strong>tags</strong> : id (PK), slug (UNIQUE), name",
            "<strong>post_tags</strong> : post_id, tag_id (PK composite, n-n)",
            "<strong>comments</strong> : id (PK), post_id (FK), user_id (FK), body, created_at",
            "Indexes : email unique, post_id sur comments, user_id sur posts/comments, published_at"
          ]},
          {code:"-- Exemple\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) NOT NULL UNIQUE,\n  name VARCHAR(100) NOT NULL,\n  password_hash VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE posts (\n  id SERIAL PRIMARY KEY,\n  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  title VARCHAR(255) NOT NULL,\n  body TEXT NOT NULL,\n  published_at TIMESTAMP,\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE INDEX idx_posts_user ON posts(user_id);\nCREATE INDEX idx_posts_published ON posts(published_at DESC);"}
        ]
      }
    ],
    quiz:[
      {q:"Un index :",opts:["Accelere SELECT","Ralentit INSERT","Les deux","Ni l'un ni l'autre"],correct:"c",
        expl:"Lecture plus rapide MAIS ecriture plus lente. C'est un compromis."},
      {q:"Pour voir le plan d'execution :",opts:["<code>SHOW PLAN</code>","<code>EXPLAIN</code>","<code>QUERY PLAN</code>","<code>ANALYZE</code>"],correct:"b",
        expl:"<code>EXPLAIN</code> (PostgreSQL/MySQL). Ajoute <code>ANALYZE</code> pour les temps reels."}
    ],
    exercises:[
      {num:1,diff:"easy",title:"Index sur email",desc:"Index unique sur la colonne email de users.",
        sol:"CREATE UNIQUE INDEX idx_users_email ON users(email);"},
      {num:2,diff:"medium",title:"Index compose",desc:"Index sur (user_id, created_at DESC) de orders.",
        sol:"CREATE INDEX idx_orders_user_date\nON orders(user_id, created_at DESC);"},
      {num:3,diff:"medium",title:"Foreign key",desc:"Table posts avec FK vers users.id, supprime en cascade.",
        sol:"CREATE TABLE posts (\n  id SERIAL PRIMARY KEY,\n  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  title VARCHAR(255) NOT NULL,\n  body TEXT\n);"},
      {num:4,diff:"hard",title:"Schema blog",desc:"Schema mini-blog : users, posts, comments, avec contraintes et indexes.",
        sol:"CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) NOT NULL UNIQUE,\n  name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE posts (\n  id SERIAL PRIMARY KEY,\n  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  title VARCHAR(255) NOT NULL,\n  body TEXT,\n  published_at TIMESTAMP\n);\n\nCREATE TABLE comments (\n  id SERIAL PRIMARY KEY,\n  post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,\n  user_id INT NOT NULL REFERENCES users(id),\n  body TEXT NOT NULL,\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE INDEX idx_posts_user ON posts(user_id);\nCREATE INDEX idx_posts_pub ON posts(published_at DESC);\nCREATE INDEX idx_comments_post ON comments(post_id);"}
    ]
  }
];

const GIO = [
  {id:"w3-intro",code:"B1",level:"basic",title:"SQL Intro",sub:"Qu'est-ce que SQL",tags:["intro","basics"],
    sections:[{h:"SQL c'est quoi ?",blocks:[
      {p:"SQL (Structured Query Language) = langage standard pour interroger les bases relationnelles : MySQL, PostgreSQL, SQLite, Oracle, SQL Server."},
      {p:"4 operations CRUD : <strong>SELECT</strong> (lire), <strong>INSERT</strong> (creer), <strong>UPDATE</strong> (modifier), <strong>DELETE</strong> (supprimer)."},
      {note:"SQL est DECLARATIF : tu dis QUOI, pas COMMENT. Le moteur trouve le chemin optimal."}
    ]}],
    quiz:[{q:"SQL est :",opts:["Imperatif","Declaratif","OOP","Fonctionnel"],correct:"b",
      expl:"Declaratif : on decrit le resultat, pas les etapes."}]
  },
  {id:"w3-syntax",code:"B2",level:"basic",title:"SQL Syntax",sub:"Mots-cles, statements, commentaires",tags:["syntax","basics"],
    sections:[{h:"Convention",blocks:[
      {code:"-- MOTS-CLES en MAJUSCULE (convention, pas obligatoire)\nSELECT name FROM users WHERE id = 1;\n\n-- Commentaire ligne\n-- Texte\n\n/* Commentaire\n   multi-ligne */\n\n-- Termine par ;"},
      {tip:"Les mots-cles sont insensibles a la casse mais SELECT en majuscule est la convention universelle."}
    ]}],
    quiz:[{q:"Un statement SQL se termine par :",opts:["<code>.</code>","<code>;</code>","<code>:</code>","Rien"],correct:"b",
      expl:"<code>;</code> separe les statements."}]
  },
  {id:"w3-select",code:"B3",level:"basic",title:"SQL SELECT",sub:"Colonnes, alias",tags:["SELECT","basics"],
    sections:[{h:"Forme",blocks:[
      {code:"SELECT col1, col2 FROM table;\n\n-- Alias\nSELECT name AS full_name, age * 12 AS age_in_months\nFROM users;\n\n-- Sans AS (autorise mais moins lisible)\nSELECT name full_name FROM users;"}
    ]}],
    quiz:[{q:"Renommer une colonne dans le resultat :",opts:["<code>RENAME</code>","<code>AS</code>","<code>NAME</code>","<code>=</code>"],correct:"b",
      expl:"<code>col AS new_name</code>. Le <code>AS</code> est optionnel mais recommande pour la lisibilite."}]
  },
  {id:"w3-where",code:"B4",level:"basic",title:"SQL WHERE",sub:"Filtrer les lignes",tags:["WHERE","basics"],
    sections:[{h:"Operateurs",blocks:[
      {code:"WHERE age >= 18\nWHERE name = 'Alice'\nWHERE name <> 'Bob'\nWHERE age BETWEEN 18 AND 65\nWHERE city IN ('Paris', 'Lyon')\nWHERE email IS NULL\nWHERE name LIKE 'A%'"}
    ]}],
    quiz:[{q:"Test 'pas null' :",opts:["<code>!= NULL</code>","<code>NOT NULL</code>","<code>IS NOT NULL</code>","<code>&lt;&gt; NULL</code>"],correct:"c",
      expl:"<code>IS NULL</code> / <code>IS NOT NULL</code>. Les <code>=</code> et <code>!=</code> ne marchent pas avec NULL."}]
  },
  {id:"w3-and-or",code:"B5",level:"basic",title:"SQL AND, OR, NOT",sub:"Combiner les conditions",tags:["logical","basics"],
    sections:[{h:"Logique",blocks:[
      {code:"WHERE country = 'FR' AND age > 18\nWHERE country = 'FR' OR country = 'BE'\nWHERE NOT (status = 'closed')\n\n-- Toujours les parentheses pour clarifier\nWHERE (country = 'FR' OR country = 'BE') AND age >= 18"}
    ]}],
    quiz:[{q:"Plus prioritaire :",opts:["<code>OR</code>","<code>AND</code>","Egal","<code>NOT</code>"],correct:"b",
      expl:"<code>AND</code> > <code>OR</code>. Toujours utiliser des parentheses pour eviter les ambiguites."}]
  },
  {id:"w3-order-by",code:"B6",level:"basic",title:"SQL ORDER BY",sub:"Trier les resultats",tags:["ORDER BY","basics"],
    sections:[{h:"Tri",blocks:[
      {code:"-- ASC = ascendant (defaut)\nORDER BY name ASC;\n\n-- DESC = descendant\nORDER BY created_at DESC;\n\n-- Multi\nORDER BY country ASC, age DESC;"}
    ]}],
    quiz:[{q:"Par defaut :",opts:["ASC","DESC","Aleatoire","Selon le moteur"],correct:"a",
      expl:"ASC est implicite quand on ne precise pas."}]
  },
  {id:"w3-joins",code:"I1",level:"intermediate",title:"SQL Joins",sub:"INNER, LEFT, RIGHT, FULL",tags:["joins","intermediate"],
    sections:[{h:"Types principaux",blocks:[
      {table:[
        ["JOIN","Garde"],
        ["INNER","Que les lignes avec match des 2 cotes"],
        ["LEFT","Toutes les lignes de gauche, NULL si pas de match a droite"],
        ["RIGHT","Inverse de LEFT (rare)"],
        ["FULL","Toutes les lignes des 2 cotes"]
      ]}
    ]}],
    quiz:[{q:"Garder TOUS les users meme sans commande :",opts:["INNER","LEFT","RIGHT","CROSS"],correct:"b",
      expl:"LEFT JOIN."}]
  },
  {id:"w3-group-by",code:"I2",level:"intermediate",title:"SQL GROUP BY",sub:"Aggregation par groupes",tags:["GROUP BY","aggregates","intermediate"],
    sections:[{h:"Aggregates",blocks:[
      {code:"SELECT category,\n       COUNT(*) AS nb,\n       AVG(price) AS prix_moy,\n       MAX(price) AS prix_max\nFROM products\nGROUP BY category\nHAVING COUNT(*) > 10\nORDER BY nb DESC;"}
    ]}],
    quiz:[{q:"Filtre apres aggregation :",opts:["<code>WHERE</code>","<code>HAVING</code>","<code>FILTER</code>","Impossible"],correct:"b",
      expl:"HAVING."}]
  },
  {id:"w3-aliases",code:"I3",level:"intermediate",title:"SQL Aliases",sub:"AS pour colonnes et tables",tags:["aliases","intermediate"],
    sections:[{h:"Usage",blocks:[
      {code:"-- Alias colonne\nSELECT name AS user_name FROM users;\n\n-- Alias table (raccourci pour les jointures)\nSELECT u.name, o.total\nFROM users AS u\nINNER JOIN orders AS o ON o.user_id = u.id;"}
    ]}],
    quiz:[{q:"AS est obligatoire ?",opts:["Oui","Non, optionnel","Que pour colonnes","Que pour tables"],correct:"b",
      expl:"<code>users u</code> equivalent a <code>users AS u</code>."}]
  },
  {id:"w3-insert",code:"I4",level:"intermediate",title:"SQL INSERT",sub:"Ajouter des lignes",tags:["INSERT","intermediate"],
    sections:[{h:"Forms",blocks:[
      {code:"-- Une ligne\nINSERT INTO users (name, email) VALUES ('Alice', 'a@x.fr');\n\n-- Plusieurs\nINSERT INTO users (name, email) VALUES\n  ('Alice', 'a@x.fr'),\n  ('Bob',   'b@x.fr');\n\n-- Depuis un SELECT\nINSERT INTO archived (id, name)\nSELECT id, name FROM users WHERE deleted_at IS NOT NULL;"}
    ]}],
    quiz:[{q:"Insert plusieurs lignes :",opts:["Plusieurs INSERT","Multi-VALUES","Loop","IMPORT"],correct:"b",
      expl:"<code>VALUES (..), (..), (..);</code>"}]
  },
  {id:"w3-update",code:"I5",level:"intermediate",title:"SQL UPDATE",sub:"Modifier des lignes",tags:["UPDATE","intermediate"],
    sections:[{h:"Toujours avec WHERE",blocks:[
      {code:"UPDATE users\nSET active = FALSE, deleted_at = NOW()\nWHERE id = 42;"},
      {bad:"UPDATE sans WHERE = met a jour TOUT. Erreur n1 en prod."}
    ]}],
    quiz:[{q:"UPDATE sans WHERE :",opts:["Met a jour 1 ligne","Met a jour 0 ligne","Met a jour TOUT","Erreur"],correct:"c",
      expl:"Catastrophe assuree."}]
  },
  {id:"w3-delete",code:"I6",level:"intermediate",title:"SQL DELETE",sub:"Supprimer des lignes",tags:["DELETE","intermediate"],
    sections:[{h:"DANGER",blocks:[
      {code:"DELETE FROM users WHERE id = 42;\nDELETE FROM orders WHERE status = 'cancelled' AND created_at < '2025-01-01';"},
      {bad:"DELETE FROM users sans WHERE = vide la table. PERSONNE n'a recu mes condoleances apres ca."}
    ]}],
    quiz:[{q:"Pour supprimer toutes les lignes mais garder la table :",opts:["<code>DROP TABLE</code>","<code>DELETE FROM table</code> ou <code>TRUNCATE</code>","<code>REMOVE</code>","<code>CLEAR</code>"],correct:"b",
      expl:"<code>TRUNCATE</code> est plus rapide (pas de WHERE possible)."}]
  },
  {id:"w3-indexes",code:"A1",level:"advanced",title:"SQL Indexes",sub:"Accelerer les requetes",tags:["indexes","performance","advanced"],
    sections:[{h:"Bases",blocks:[
      {code:"CREATE INDEX idx_users_email ON users(email);\nCREATE UNIQUE INDEX idx_users_email_uniq ON users(email);\nCREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);"},
      {warn:"Trop d'indexes ralentit l'ecriture. Indexe seulement ce que tu RECHERCHES souvent."}
    ]}],
    quiz:[{q:"Un index :",opts:["Accelere SELECT","Ralentit INSERT","Les deux","Ni"],correct:"c",
      expl:"Compromis."}]
  },
  {id:"w3-transactions",code:"A2",level:"advanced",title:"SQL Transactions",sub:"ACID, BEGIN, COMMIT, ROLLBACK",tags:["transactions","ACID","advanced"],
    sections:[{h:"Tout ou rien",blocks:[
      {code:"BEGIN;\n\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\nCOMMIT;\n-- ou en cas d'erreur :\n-- ROLLBACK;"},
      {tip:"ACID = Atomicity, Consistency, Isolation, Durability. Les 4 garanties d'une transaction."}
    ]}],
    quiz:[{q:"Pour annuler :",opts:["<code>CANCEL</code>","<code>ROLLBACK</code>","<code>UNDO</code>","<code>REVERT</code>"],correct:"b",
      expl:"ROLLBACK annule depuis le BEGIN."}]
  },
  {id:"w3-views",code:"A3",level:"advanced",title:"SQL Views",sub:"Vues = requete sauvegardee",tags:["views","advanced"],
    sections:[{h:"Creer une vue",blocks:[
      {code:"CREATE VIEW active_users AS\nSELECT id, name, email\nFROM users\nWHERE deleted_at IS NULL;\n\n-- Utiliser comme une table\nSELECT * FROM active_users WHERE name LIKE 'A%';"}
    ]}],
    quiz:[{q:"Une vue stocke :",opts:["Les donnees","La requete","Les indexes","Rien"],correct:"b",
      expl:"Une vue = requete sauvegardee. Les donnees sont calculees a chaque acces."}]
  },
  {id:"w3-constraints",code:"A4",level:"advanced",title:"SQL Constraints",sub:"NOT NULL, UNIQUE, FK, CHECK",tags:["constraints","advanced"],
    sections:[{h:"Contraintes",blocks:[
      {code:"CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) NOT NULL UNIQUE,\n  name VARCHAR(100) NOT NULL,\n  age INT CHECK (age >= 0 AND age <= 150),\n  country_code CHAR(2) DEFAULT 'FR',\n  manager_id INT REFERENCES users(id) ON DELETE SET NULL\n);"}
    ]}],
    quiz:[{q:"Pour interdire les doublons sur une colonne :",opts:["<code>NOT NULL</code>","<code>UNIQUE</code>","<code>PRIMARY KEY</code>","Index"],correct:"b",
      expl:"<code>UNIQUE</code> interdit les doublons. <code>PRIMARY KEY</code> = UNIQUE + NOT NULL."}]
  },
  {id:"w3-operators",code:"B7",level:"basic",title:"SQL Operators",sub:"Arithmetic, comparison, logical",tags:["operators","basics"],
    sections:[{h:"Toutes categories",blocks:[
      {table:[
        ["Categorie","Operateurs"],
        ["Arithmetique","<code>+ - * / %</code>"],
        ["Comparison","<code>= &lt;&gt; != &lt; &gt; &lt;= &gt;=</code>"],
        ["Logique","<code>AND OR NOT</code>"],
        ["Plage","<code>BETWEEN ... AND</code>"],
        ["Liste","<code>IN, NOT IN</code>"],
        ["Pattern","<code>LIKE, NOT LIKE, ILIKE</code> (PG)"],
        ["NULL","<code>IS NULL, IS NOT NULL</code>"],
        ["Existence","<code>EXISTS, NOT EXISTS</code>"],
        ["Quantif.","<code>ANY, ALL, SOME</code>"]
      ]},
      {code:"-- Operateurs en pratique\nSELECT * FROM users WHERE age BETWEEN 18 AND 65;\nSELECT * FROM users WHERE country IN ('FR', 'BE', 'CH');\nSELECT * FROM products WHERE price >= ALL (SELECT price FROM products WHERE category = 'premium');\nSELECT * FROM orders WHERE EXISTS (SELECT 1 FROM users WHERE users.id = orders.user_id);"}
    ]}],
    quiz:[{q:"<code>!=</code> et <code>&lt;&gt;</code> :",opts:["Differents","Identiques","!= est faux","&lt;&gt; est SQL"],correct:"b",
      expl:"Tous les deux = 'different'. &lt;&gt; est le standard SQL, != est tolere."}]
  },
  {id:"w3-null",code:"B8",level:"basic",title:"SQL NULL Values",sub:"IS NULL, COALESCE, NULLIF",tags:["NULL","basics"],
    sections:[{h:"NULL : un etat special",blocks:[
      {p:"<code>NULL</code> = 'on ne sait pas'. PAS la meme chose que 0 ou ''."},
      {code:"-- Tester null\nSELECT * FROM users WHERE email IS NULL;\nSELECT * FROM users WHERE email IS NOT NULL;\n\n-- COALESCE : prend la premiere non-null\nSELECT name, COALESCE(email, phone, 'Pas de contact') AS contact\nFROM users;\n\n-- IFNULL (MySQL) / NVL (Oracle)\nSELECT IFNULL(email, 'inconnu') FROM users;\n\n-- NULLIF : retourne NULL si les 2 sont egaux, sinon le premier\nSELECT NULLIF(price, 0) FROM products;  -- 0 -> NULL\n\n-- NULL dans aggregations : IGNORE\nSELECT COUNT(*) FROM users;        -- compte toutes les lignes\nSELECT COUNT(email) FROM users;    -- compte non-null seulement"},
      {warn:"<code>NULL = NULL</code> retourne NULL (pas true) ! Toujours utiliser <code>IS NULL</code>."}
    ]}],
    quiz:[{q:"<code>NULL = NULL</code> retourne :",opts:["true","false","NULL","Erreur"],correct:"c",
      expl:"NULL n'est jamais egal a NULL. Utilise IS NULL."}]
  },
  {id:"w3-wildcards",code:"B9",level:"basic",title:"SQL Wildcards",sub:"LIKE patterns",tags:["wildcards","LIKE","basics"],
    sections:[{h:"Pattern matching",blocks:[
      {table:[
        ["Wildcard","Sens","Exemple match"],
        ["<code>%</code>","0 ou + caracteres","'a%' matches 'apple', 'a'"],
        ["<code>_</code>","Exactement 1 char","'_at' matches 'cat', 'bat'"],
        ["<code>[charlist]</code>","SQL Server","'[abc]%' = a, b ou c"],
        ["<code>[!charlist]</code>","SQL Server NOT","'[!abc]%'"],
        ["<code>[a-d]</code>","SQL Server range","de a a d"]
      ]},
      {code:"-- Examples\nSELECT * FROM users WHERE name LIKE 'A%';        -- commence par A\nSELECT * FROM users WHERE name LIKE '%son';       -- finit par son\nSELECT * FROM users WHERE name LIKE '%mar%';      -- contient mar\nSELECT * FROM users WHERE name LIKE '_a%';        -- 2eme lettre = a\nSELECT * FROM products WHERE name LIKE 'Phone__'; -- 'Phone' + 2 chars\n\n-- Insensitive case (PostgreSQL)\nSELECT * FROM users WHERE name ILIKE 'mar%';\n\n-- Escape un wildcard\nSELECT * FROM products WHERE name LIKE '50%%' ESCAPE '\\\\';"}
    ]}],
    quiz:[{q:"<code>'__t'</code> matche :",opts:["any 3 chars endant par t","Que 'at'","Erreur","'t' seul"],correct:"a",
      expl:"<code>_</code> = exactement 1 char. <code>__t</code> = 3 chars dont le dernier est t."}]
  },
  {id:"w3-functions",code:"I7",level:"intermediate",title:"SQL Functions",sub:"String, numeric, date functions",tags:["functions","intermediate"],
    sections:[{h:"Fonctions string",blocks:[
      {code:"SELECT UPPER(name) FROM users;             -- majuscules\nSELECT LOWER(email) FROM users;\nSELECT LENGTH(name) FROM users;            -- nb chars\nSELECT TRIM(name) FROM users;              -- enleve espaces\nSELECT LTRIM(name), RTRIM(name);\nSELECT SUBSTRING(name, 1, 3) FROM users;   -- premiers 3 chars\nSELECT CONCAT(first, ' ', last) FROM users;\nSELECT REPLACE(email, '@old', '@new');\nSELECT POSITION('a' IN name);              -- position du 'a'\nSELECT LEFT(name, 3), RIGHT(name, 3);"},
      {code:"-- Fonctions numeriques\nSELECT ROUND(price, 2) FROM products;\nSELECT CEIL(3.2), FLOOR(3.8);\nSELECT ABS(-5);                    -- 5\nSELECT MOD(10, 3);                  -- 1\nSELECT POWER(2, 10);                -- 1024\nSELECT SQRT(16);                    -- 4\nSELECT RANDOM();                    -- 0 a 1"},
      {code:"-- Fonctions date (PostgreSQL / MySQL syntax mixed)\nSELECT NOW();                      -- timestamp courant\nSELECT CURRENT_DATE;\nSELECT CURRENT_TIME;\nSELECT EXTRACT(YEAR FROM created_at);\nSELECT EXTRACT(MONTH FROM created_at);\nSELECT DATE_ADD(NOW(), INTERVAL 7 DAY);    -- MySQL\nSELECT NOW() + INTERVAL '7 days';           -- PostgreSQL\nSELECT DATEDIFF(end_date, start_date);"}
    ]}],
    quiz:[{q:"Pour avoir le nom en majuscules :",opts:["<code>CAPS</code>","<code>UPPER</code>","<code>STRTOUPPER</code>","<code>BIG</code>"],correct:"b",
      expl:"<code>UPPER(col)</code>."}]
  },
  {id:"w3-union",code:"I8",level:"intermediate",title:"SQL UNION",sub:"Combiner resultats",tags:["UNION","intermediate"],
    sections:[{h:"UNION",blocks:[
      {p:"Combine les resultats de plusieurs SELECT. Doivent avoir le MEME nombre de colonnes, types compatibles."},
      {code:"-- UNION : enleve les doublons\nSELECT name, 'employee' AS type FROM employees\nUNION\nSELECT name, 'customer' AS type FROM customers;\n\n-- UNION ALL : garde les doublons (plus rapide)\nSELECT product FROM orders_2025\nUNION ALL\nSELECT product FROM orders_2026;\n\n-- Avec ORDER BY (a la fin)\nSELECT name, age FROM users WHERE country = 'FR'\nUNION\nSELECT name, age FROM users WHERE country = 'BE'\nORDER BY age DESC;"},
      {note:"<code>UNION ALL</code> garde les doublons donc plus rapide (pas de dedup). A utiliser si tu sais qu'il n'y en aura pas ou s'ils sont OK."}
    ]}],
    quiz:[{q:"UNION vs UNION ALL :",opts:["Identique","UNION dedup, ALL non","Inverse","UNION plus rapide"],correct:"b",
      expl:"UNION fait un DISTINCT implicite. UNION ALL garde tout (plus rapide)."}]
  },
  {id:"w3-case",code:"I9",level:"intermediate",title:"SQL CASE",sub:"if/else en SQL",tags:["CASE","intermediate"],
    sections:[{h:"CASE expression",blocks:[
      {code:"-- CASE en SELECT (calculer une colonne)\nSELECT\n  name,\n  age,\n  CASE\n    WHEN age < 18 THEN 'Mineur'\n    WHEN age < 65 THEN 'Adulte'\n    ELSE 'Senior'\n  END AS categorie\nFROM users;\n\n-- CASE en ORDER BY (tri custom)\nSELECT * FROM tickets\nORDER BY\n  CASE priority\n    WHEN 'high' THEN 1\n    WHEN 'medium' THEN 2\n    WHEN 'low' THEN 3\n  END;\n\n-- CASE en UPDATE\nUPDATE products\nSET discount = CASE\n  WHEN price > 100 THEN 15\n  WHEN price > 50 THEN 10\n  ELSE 5\nEND;"}
    ]}],
    quiz:[{q:"Fin d'un CASE :",opts:["<code>ENDIF</code>","<code>ENDCASE</code>","<code>END</code>","<code>FI</code>"],correct:"c",
      expl:"<code>CASE ... END</code>."}]
  },
  {id:"w3-data-types",code:"I10",level:"intermediate",title:"SQL Data Types",sub:"VARCHAR, INT, DATE, JSON...",tags:["types","intermediate"],
    sections:[{h:"Types principaux",blocks:[
      {table:[
        ["Categorie","Types"],
        ["Texte court","<code>VARCHAR(N), CHAR(N)</code>"],
        ["Texte long","<code>TEXT, MEDIUMTEXT, LONGTEXT</code>"],
        ["Entiers","<code>TINYINT, SMALLINT, INT, BIGINT</code>"],
        ["Decimaux","<code>DECIMAL(p,s), FLOAT, DOUBLE</code>"],
        ["Boolean","<code>BOOLEAN, BIT</code>"],
        ["Date","<code>DATE, TIME, DATETIME, TIMESTAMP</code>"],
        ["Binaire","<code>BLOB, BYTEA</code>"],
        ["JSON","<code>JSON, JSONB</code> (PG)"],
        ["Auto-incr","<code>SERIAL</code> (PG), <code>AUTO_INCREMENT</code> (MySQL)"]
      ]},
      {code:"CREATE TABLE products (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  description TEXT,\n  price DECIMAL(10, 2) NOT NULL,\n  in_stock BOOLEAN DEFAULT TRUE,\n  created_at TIMESTAMP DEFAULT NOW(),\n  metadata JSONB\n);"},
      {warn:"<code>DECIMAL</code> pour l'argent (pas <code>FLOAT</code> ! Erreurs d'arrondi)."}
    ]}],
    quiz:[{q:"Pour stocker un prix :",opts:["FLOAT","DOUBLE","DECIMAL(10,2)","VARCHAR"],correct:"c",
      expl:"DECIMAL = precision exacte. FLOAT/DOUBLE = approximations."}]
  },
  {id:"w3-alter",code:"A5",level:"advanced",title:"SQL ALTER TABLE",sub:"Modifier le schema",tags:["ALTER","schema","advanced"],
    sections:[{h:"Modifier une table",blocks:[
      {code:"-- Ajouter une colonne\nALTER TABLE users ADD COLUMN phone VARCHAR(20);\n\n-- Avec defaut + NOT NULL (utile pour grosses tables)\nALTER TABLE users ADD COLUMN active BOOLEAN NOT NULL DEFAULT TRUE;\n\n-- Renommer\nALTER TABLE users RENAME COLUMN phone TO mobile;\nALTER TABLE users RENAME TO members;\n\n-- Changer le type\nALTER TABLE users ALTER COLUMN email TYPE VARCHAR(255);     -- PostgreSQL\nALTER TABLE users MODIFY email VARCHAR(255);                 -- MySQL\n\n-- Supprimer une colonne\nALTER TABLE users DROP COLUMN bio;\n\n-- Ajouter une contrainte\nALTER TABLE users ADD CONSTRAINT uniq_email UNIQUE (email);\n\n-- Supprimer une contrainte\nALTER TABLE users DROP CONSTRAINT uniq_email;"},
      {warn:"En prod, ajouter une colonne NOT NULL sans DEFAULT sur une table existante peut lock la table. Toujours mettre DEFAULT pour migrations zero-downtime."}
    ]}],
    quiz:[{q:"Ajouter une colonne :",opts:["<code>UPDATE TABLE</code>","<code>ALTER TABLE ADD COLUMN</code>","<code>INSERT COLUMN</code>","<code>CREATE COLUMN</code>"],correct:"b",
      expl:"<code>ALTER TABLE ... ADD COLUMN ...</code>."}]
  },
  {id:"w3-auto-incr",code:"A6",level:"advanced",title:"SQL Auto Increment",sub:"SERIAL, AUTO_INCREMENT, IDENTITY",tags:["auto-incr","advanced"],
    sections:[{h:"Cle auto-incrementee",blocks:[
      {code:"-- PostgreSQL\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,    -- INT 1, 2, 3...\n  name VARCHAR(100)\n);\n-- ou GENERATED (SQL standard, PG 10+)\nCREATE TABLE users (\n  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  name VARCHAR(100)\n);\n\n-- MySQL\nCREATE TABLE users (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(100)\n);\n-- Reset le compteur\nALTER TABLE users AUTO_INCREMENT = 1000;\n\n-- SQL Server\nCREATE TABLE users (\n  id INT IDENTITY(1, 1) PRIMARY KEY,\n  name VARCHAR(100)\n);\n\n-- INSERT sans specifier l'id\nINSERT INTO users (name) VALUES ('Alice');\n-- id auto-attribue"},
      {tip:"En 2026, prefere <code>UUID</code> pour les apps distribuees (pas de collision entre instances)."}
    ]}],
    quiz:[{q:"PostgreSQL auto-incr :",opts:["AUTO_INCREMENT","SERIAL","IDENTITY","INC"],correct:"b",
      expl:"SERIAL en PostgreSQL (alias pour INT + sequence)."}]
  },
  {id:"w3-dates",code:"A7",level:"advanced",title:"SQL Dates",sub:"DATE, TIMESTAMP, INTERVAL",tags:["dates","advanced"],
    sections:[{h:"Travailler avec les dates",blocks:[
      {code:"-- Get dates\nSELECT NOW();                       -- timestamp courant\nSELECT CURRENT_DATE;                 -- juste date\nSELECT CURRENT_TIME;\n\n-- Extraire des parts\nSELECT EXTRACT(YEAR FROM created_at) FROM orders;\nSELECT EXTRACT(MONTH FROM created_at);\nSELECT EXTRACT(DOW FROM created_at);  -- day of week\n\n-- Calculs (PostgreSQL)\nSELECT NOW() + INTERVAL '7 days';\nSELECT NOW() - INTERVAL '1 month';\nSELECT NOW() - created_at AS age_de_commande;\n\n-- MySQL\nSELECT DATE_ADD(NOW(), INTERVAL 7 DAY);\nSELECT DATEDIFF(end_date, start_date);\n\n-- Format (MySQL)\nSELECT DATE_FORMAT(NOW(), '%Y-%m-%d');\nSELECT DATE_FORMAT(NOW(), '%d/%m/%Y %H:%i');\n\n-- Format (PostgreSQL)\nSELECT TO_CHAR(NOW(), 'YYYY-MM-DD');\nSELECT TO_CHAR(NOW(), 'DD/MM/YYYY HH24:MI');\n\n-- Truncate (PostgreSQL)\nSELECT DATE_TRUNC('month', created_at);   -- 1er du mois\nSELECT DATE_TRUNC('day', created_at);"},
      {warn:"Toujours stocker les dates en UTC en base. Convertir au timezone user en affichage."}
    ]}],
    quiz:[{q:"Difference entre 2 dates en PG :",opts:["DATEDIFF","date1 - date2","DIFF_DATES","SUB"],correct:"b",
      expl:"PostgreSQL : <code>date1 - date2</code> retourne un INTERVAL."}]
  },
  {id:"w3-injection",code:"A8",level:"advanced",title:"SQL Injection (prevention)",sub:"Prepared statements",tags:["security","injection","advanced"],
    sections:[{h:"Le danger",blocks:[
      {p:"<strong>SQL injection</strong> = mettre du SQL malicieux dans un champ user pour acceder/detruire la base."},
      {code:"-- ❌ DANGEREUX (concatenation directe)\nconst userInput = \"' OR '1'='1\";\nconst sql = `SELECT * FROM users WHERE email = '${userInput}'`;\n-- devient : SELECT * FROM users WHERE email = '' OR '1'='1'\n-- = TOUS les users\n\n-- ✅ SAFE (prepared statement)\n// PHP PDO\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);\n\n// Node.js (pg)\nawait client.query('SELECT * FROM users WHERE email = $1', [email]);\n\n// Python (psycopg)\ncur.execute('SELECT * FROM users WHERE email = %s', (email,));\n\n// Named parameters\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');\n$stmt->execute(['email' => $email]);"},
      {tip:"REGLE : JAMAIS de concatenation de string user dans une requete. TOUJOURS des prepared statements."}
    ]}],
    quiz:[{q:"Pour eviter SQL injection :",opts:["Escape la string","Prepared statements","Trim les espaces","Length check"],correct:"b",
      expl:"Prepared statements = le serveur SQL traite la value comme donnee, pas comme code."}]
  },
  {id:"w3-comments",code:"B10",level:"basic",title:"SQL Comments",sub:"-- et /* */",tags:["comments","basics"],
    sections:[{h:"Commentaires SQL",blocks:[
      {code:"-- Commentaire sur une ligne (standard)\nSELECT * FROM users;\n\n# Commentaire MySQL (non standard)\n\n/* Commentaire\n   multi-lignes */\nSELECT * FROM users; /* inline aussi */\n\n-- Ignorer une partie d'une requete temporairement\nSELECT id, name --, email\nFROM users\n-- WHERE active = TRUE\n;"},
      {tip:"<code>--</code> est universel SQL. Prefere-le a <code>#</code> (MySQL only)."}
    ]}],
    quiz:[{q:"Commentaire ligne SQL :",opts:["//","--","#","/*"],correct:"b",
      expl:"<code>--</code> est le standard."}]
  }
];

const ALL_LESSONS = [...DAYS, ...GIO];
const TOTAL = ALL_LESSONS.length;
const TOTAL_EXERCISES = DAYS.reduce((sum, d) => sum + (d.exercises ? d.exercises.length : 0), 0);
