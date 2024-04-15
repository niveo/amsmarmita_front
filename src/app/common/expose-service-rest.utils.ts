/**
 *Deixar apenas esse metodo nesse util para não carregar funções não utilitarias nos import dinamicos
 */
export function ExposeServiceRest({ path }: { path?: string }): ClassDecorator {
  return (target) => {
    Object.defineProperty(target.prototype, 'path', { value: path });
  };
}
