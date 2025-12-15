
Program        ::= StatementList

StatementList  ::= { Statement }

Statement      ::= VarDeclaration
                 | Assignment
                 | WhileLoop

VarDeclaration ::= "var" IDENT "=" ArithExpr ";"

Assignment     ::= IDENT "=" ArithExpr ";"

WhileLoop      ::= "while" "(" BoolExpr ")" Block

Block          ::= "{" StatementList "}"

ArithExpr      ::= Term { ("+" | "-") Term }

Term           ::= Factor { "*" Factor }

Factor         ::= NUM
                 | IDENT
                 | "(" ArithExpr ")"

BoolExpr       ::= ArithExpr RelOp ArithExpr

RelOp          ::= ">" | "<" | ">=" | "<=" | "==" | "!="