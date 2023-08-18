interface SortFilter<T> {
    [key: string]: 'asc' | 'desc';
  }
  
  interface PaginatableSortable<T> {
    sort( filter: SortFilter<T>): T[];
    paginate(items: T[], page: number, size: number): T[];
  }
  
  class BaseEntity<T> implements PaginatableSortable<T> {
 
     items:T[]
     constructor(items:T[]){
        this.items=items
     }
     sort( filter: SortFilter<T>): T[] {
      const keys = Object.keys(filter) as (keyof T)[];
      return this.items.slice().sort((a, b) => {
        for (const key of keys) {
          const direction = filter[key] as 'asc' | 'desc';
          const aValue = a[key];
          const bValue = b[key];
  
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction === 'asc'
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          } else {
            if (aValue < bValue) {
              return direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
              return direction === 'asc' ? 1 : -1;
            }
          }
        }
        return 0;
      });
    }
  
    paginate(items: T[], page: number, size: number): T[] {
      const startIndex = (page - 1) * size;
      return items.slice(startIndex, startIndex + size);
    }
  }
  
  class Employee  {
    name?: string;
    age?: number;
    salary?: number;
  
    // Resto da definição da classe Employee
  }
  
  // Exemplo de uso
  const employeesData: Employee[] = [
    {name:'JOdn',age:25,salary:3000},{name:'Jadn',age:25,salary:
    6000},
    {name:'alef',age:22,salary:4000},{name:'Maria',age:28,salary:
    9000}
  ];

const employees= new BaseEntity(employeesData)
  
  // Ordenar por nome (ascendente) e, em caso de empate no nome, ordenar por salário (ascendente)
  const sortedEmployees = employees.sort({ name: 'asc', salary: 'desc' ,age:'desc'});
  
  console.log(sortedEmployees);
  
  // Paginar
  const page = 1;
  const pageSize = 2;
  const paginatedEmployees = employees.paginate(sortedEmployees, page, pageSize);
  
  console.log(paginatedEmployees);
