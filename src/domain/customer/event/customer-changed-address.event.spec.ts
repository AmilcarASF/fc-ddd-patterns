import EventDispatcher from "./../../@shared/event/event-dispatcher";
import CustomerChangedAddressEvent from "./customer-changed-address.event";
import SendConsoleLogHandler from "./handler/customer-changed-address.event-handler";

describe("Domain events tests", () => {

  it("should register event", () => {
    const nameEvent = 'CustomerChangedAddressEvent';
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register(nameEvent, new SendConsoleLogHandler());
    expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();
  });

  it("should must register custom event name", () => {
    const nameEvent = 'TestEvent';
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register(nameEvent, new SendConsoleLogHandler());
    expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();
  });

  it("should unregister event", () => {
    const nameEvent = 'CustomerChangedAddressEvent';
    const eventDispatcher = new EventDispatcher();
    const sendEventHandler = new SendConsoleLogHandler();

    eventDispatcher.register(nameEvent, sendEventHandler);
    expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();

    eventDispatcher.unregister(nameEvent, sendEventHandler);
    expect(eventDispatcher.getEventHandlers[nameEvent].length).toBe(0);
  });

  it("should notify events", () => {
    const nameEvent = 'CustomerChangedAddressEvent';
    const eventDispatcher = new EventDispatcher();
    const sendEventHandler = new SendConsoleLogHandler();
    const spyEvent = jest.spyOn(sendEventHandler, "handle");

    eventDispatcher.register(nameEvent, sendEventHandler);
    expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();

    eventDispatcher.notify(new CustomerChangedAddressEvent({
      id: 1,
      name: "Customer",
      address: {
        street: "Rua dos Cristais",
        number: 46,
        zip: 18605525,
        city: "São Paulo",
      }
    }));

    expect(spyEvent).toHaveBeenCalled();
  });

  it("should unregister events", () => {
    const nameEvent = 'CustomerChangedAddressEvent';
    const eventDispatcher = new EventDispatcher();
    const sendEventHandler = new SendConsoleLogHandler();

    eventDispatcher.register(nameEvent, sendEventHandler);
    expect(eventDispatcher.getEventHandlers[nameEvent]).toBeDefined();

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers[nameEvent]).toBeUndefined();
  });

});