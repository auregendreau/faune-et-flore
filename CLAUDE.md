@AGENTS.md

## Propre à Claude Code

- Les skills sont lus dans `.claude/skills`, lien symbolique vers
  `.agents/skills` : c'est là qu'on les écrit.
- Les questions à l'enseignante passent par `AskUserQuestion`, une à la
  fois.
- Une première session après la reprise de la classe (« Je reprends ma
  classe… ») suit le skill `reprendre-ma-classe` : mettre `depot` à jour
  dans `classe.yml`, régénérer, contrôler jusqu'au PDF, publier.
- **Ne pas mesurer un skill avec le banc d'essai du skill-creator** : il
  passe par un faux fichier de commande que cette version de Claude Code
  n'expose pas comme un skill, si bien qu'aucune demande ne déclenche jamais
  rien — il annonçait 10/20 là où `scripts/mesurer-declenchement.py` donne
  20/20.
