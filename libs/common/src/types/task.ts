// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v5.29.1
// source: proto/task.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "tasks";

export interface Empty {
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  caseId: string;
  dueDate: string;
  assigneeIds: string[];
}

export interface DeleteResponse {
  success: boolean;
}

export interface DeleteTaskRequest {
  id: string;
}

export interface UpdateTaskRequest {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assigneeIds: string[];
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  caseId: string;
  dueDate: string;
  assigneeIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ListTasksRequest {
  caseId: string;
}

export interface ListTasksResponse {
  tasks: TaskResponse[];
}

export const TASKS_PACKAGE_NAME = "tasks";

export interface TaskServiceClient {
  createTask(request: CreateTaskRequest): Observable<TaskResponse>;

  getTask(request: Empty): Observable<TaskResponse>;

  listTasks(request: ListTasksRequest): Observable<ListTasksResponse>;

  updateTask(request: UpdateTaskRequest): Observable<TaskResponse>;

  deleteTask(request: DeleteTaskRequest): Observable<DeleteResponse>;
}

export interface TaskServiceController {
  createTask(request: CreateTaskRequest): Promise<TaskResponse> | Observable<TaskResponse> | TaskResponse;

  getTask(request: Empty): Promise<TaskResponse> | Observable<TaskResponse> | TaskResponse;

  listTasks(request: ListTasksRequest): Promise<ListTasksResponse> | Observable<ListTasksResponse> | ListTasksResponse;

  updateTask(request: UpdateTaskRequest): Promise<TaskResponse> | Observable<TaskResponse> | TaskResponse;

  deleteTask(request: DeleteTaskRequest): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function TaskServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTask", "getTask", "listTasks", "updateTask", "deleteTask"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TaskService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TaskService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TASK_SERVICE_NAME = "TaskService";
