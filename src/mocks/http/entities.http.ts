import { Post } from '../../modules/post/api/post.schema';
import { Todo } from '../../modules/todo/api/todo.schema';
import { User } from '../../modules/user/api/user.schema';

export function mockUser(initialValue?: Partial<User>): User {
  return {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
    ...(initialValue && initialValue),
  };
}

export function mockPost(initialValue?: Partial<Post>): Post {
  return {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    ...(initialValue && initialValue),
  };
}

export function mockTodo(initialValue?: Partial<Todo>): Todo {
  return {
    id: 1,
    title: 'suscipit repellat esse quibusdam voluptatem incidunt',
    completed: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...(initialValue && initialValue),
  };
}
