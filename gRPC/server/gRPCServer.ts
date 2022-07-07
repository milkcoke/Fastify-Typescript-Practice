import grpc, {ServiceDefinition} from 'grpc';
import {loadSync} from '@grpc/proto-loader';
import path from "path";
import {employees} from "@data/employees"

const PROTO_PATH = path.join(__dirname, '..', 'proto/employee.proto');

// Load proto file
const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
// get the employee proto buffer definition.
const employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

// Service Procedure function implementation
function getInfo(call: any, callback: Function) {
    return callback(null, {
        message: employees.find(employee=>employee.id === call.request.id)
    });
}
(async ()=>{
    // create gRPC Server
    const gRPCServer : grpc.Server = new grpc.Server();

    // Service implementation.
    // getInformation function in employee_proto.Employee service
    gRPCServer.addService(employee_proto.Employee.service as ServiceDefinition, {
        getInformation: getInfo
    });

    gRPCServer.bind('0.0.0.0:4500', grpc.ServerCredentials.createInsecure());
    gRPCServer.start();
})();



