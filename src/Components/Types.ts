export type Task = {
    id: number,
    title: string,
    status: string,
    priority: string,
    discription?: string,
    statusColor: string,
    priorityColor: string,
    date: string
}

export type Table = {
    [key: string]: Task[]
}

export const smoothColors = [
  "#FF6B6B",
  "#69DB7C",
  "#748FFC",
  "#FF8E72",
  "#9775FA",
  "#FFA94D",
  "#FFD43B",
  "#38D9A9",
  "#4DABF7",
  "#DA77F2",
];

export const statusBadges = ['Started' , 'In-Progress', 'Done']
export const priorityBadges = ['Low' , 'Medium', 'High']

export const getDate = (): string =>{
    const date = new Date();
    return `${date.getDate().toString().padStart(2,'0')}-${(date.getDay().toString().padStart(2,'0'))}-${date.getFullYear()}`
}
