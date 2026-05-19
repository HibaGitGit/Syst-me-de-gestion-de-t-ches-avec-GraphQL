let tasks = [

    {
        id: '1',
        title: 'Développement Front-end',
        description: 'Créer une interface React',
        completed: false,
        duration: 10
    },

    {
        id: '2',
        title: 'Développement Back-end',
        description: 'Créer API Node.js',
        completed: false,
        duration: 15
    },

    {
        id: '3',
        title: 'Tests',
        description: 'Tester application',
        completed: false,
        duration: 5
    }
];

const taskResolver = {

    Query: {

        task: (_, { id }) =>
            tasks.find(task => task.id === id),

        tasks: () => tasks,
    },

    Mutation: {

        addTask: (_, {
            title,
            description,
            completed,
            duration
        }) => {

            const task = {

                id: String(tasks.length + 1),
                title,
                description,
                completed,
                duration
            };

            tasks.push(task);

            return task;
        },

        completeTask: (_, { id }) => {

            const taskIndex =
                tasks.findIndex(task => task.id === id);

            if (taskIndex !== -1) {

                tasks[taskIndex].completed = true;

                return tasks[taskIndex];
            }

            return null;
        },

        changeDescription: (_, { id, description }) => {

            const task =
                tasks.find(task => task.id === id);

            if (task) {

                task.description = description;
                return task;
            }

            return null;
        },

        deleteTask: (_, { id }) => {

            const taskIndex =
                tasks.findIndex(task => task.id === id);

            if (taskIndex !== -1) {

                const deletedTask =
                    tasks.splice(taskIndex, 1)[0];

                return deletedTask;
            }

            return null;
        }
    }
};

module.exports = taskResolver;