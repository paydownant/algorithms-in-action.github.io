/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-lonely-if */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multi-spaces,indent,prefer-destructuring */
import parse from '../../pseudocode/parse';
import { BSTExp } from '../explanations';
import GraphTracer from '../../components/DataStructures/Graph/GraphTracer';

export default {
  name: 'Transitive CLosure',
  pseudocode: parse(`
procedure BinaryTreeSearch(Tree, Item):  $start
  Ptr = Root;                   $1            (* Set search pointer Ptr to root *)
  while (Ptr Not Null)          $2            (* Continue searching until we go past a leaf to Null *)
    if(Ptr->Key == Item)        $3            (* Compare to see if keys match *)
      return FOUND              $4            (* Keys match, item has been found in tree *)
    else                        $a
      if(DataItem < Ptr->Key)   $5            (* Compare data item and the data pointed by the search pointer *)
        Ptr = Ptr->lchild       $6            (* Item key is less, so should follow the left child on search path. *)
      else                      $b            (* Item key is greater or equal to data pointed by the search pointer. *)
        Ptr = Ptr->rchild       $7            (* Item key is greater or equal, so should follow the right child on search path *)
      end if                    $c
    end if                      $d
  end while                     $e
  return NOTFOUND               $8            (* Following along the search path, item was not encountered, so it must not be in the tree. *)
`),
  explanation: BSTExp,

  initVisualisers() {
    return {
      graph: {
        instance: new GraphTracer('tc', null, 'Transitive Closure'),
        order: 0
      }, 
    };
  },

  run(chunker) {
    const nodes = [
      [0, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0],
    ];
    const numOfNodes = 6;
    
    chunker.add('start', (g) => {
      g.set(nodes);
      g.layoutCircle();
    }, [this.graph]);

    chunker.add('1');

    for (let k = 0; k < numOfNodes; k++) {
      for (let i = 0; i < numOfNodes; i++) {
        if (nodes[i][k] === 1) {
          for (let j = 0; j < numOfNodes; j++) {
            if (nodes[k][j] === 1) { 
              chunker.add('2', (g, i) => g.visit(i), [this.graph, i]);
              chunker.add('3', (g, k, i) => g.visit(k, i), [this.graph, k, i]);
              chunker.add('4', (g, j, k) => g.visit(j, k), [this.graph, j, k]);
              chunker.add('5', (g, i, j) => g.addEdge(i, j), [this.graph, i, j]);
              chunker.add('6', (g, j, i) => g.visit(j, i), [this.graph, j, i]);
              chunker.add('7', (g) => {
                g.leave(j, i);
                g.leave(j, k);
                g.leave(k, i);
                g.leave(i);
              }, [this.graph]);
            }  
          } 
       }
     }
  }
  },
};
