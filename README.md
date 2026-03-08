# Playable Supermarket Simulator Game

## Technologies and Techniques Used

### 1. Engine
- **Cocos Creator 3.8.6**

### 2. Design Patterns

#### Service Locator Pattern
- **File**: `ServiceLocator.ts`
- **Description**: Manages global services such as GameManager, NavigationContainer, ItemManager. Allows easy registration and retrieval of instances without complex dependency injection.

#### Event Bus Pattern
- **File**: `EventBus.ts`
- **Description**: Simple event system using Map to manage events and callbacks. Enables decoupling between components.

#### Observer Pattern (Reactive Programming)
- **File**: `Observable.ts`
- **Description**: Observable class allows reactive data binding. When the value changes, it automatically notifies listeners.

#### Navigation System
- **Files**: `UI/Navigation/NavigationContainer.ts`, `UI/Navigation/StackNavigator.ts`, `UI/Navigation/Navigator.ts`, `UI/Navigation/ScreenBase.ts`
- **Description**: Stack-based navigation system to manage screens. Uses StackNavigator to push/pop screens like CardCheckoutScreen, CashCheckoutScreen, EndGameScreen.

### 3. Game Mechanics

#### Item Management
- **File**: `ItemManager.ts`
- **Description**: Manages spawning items and money. Uses Map to cache prefabs, spawns money randomly around the checkout counter.

#### Customer AI
- **File**: `Customer.ts`
- **Description**: Logic for customers with animation, item lists, payment methods (card/cash), and movement behavior.

#### Checkout System
- **Files**: `Checkout/CheckoutCounter.ts`, `Checkout/PaymentItem.ts`
- **Description**: Checkout counter logic, handles payments, validates items.

#### Click System
- **File**: `ClickSystem.ts`
- **Description**: Handles input click/touch for interactable objects.

#### Queue Management
- **File**: `QueueManager.ts`
- **Description**: Manages customer queues.

#### Calculator
- **File**: `CalculatorModel.ts`
- **Description**: Calculation logic for payments.

#### Monitor UI
- **Files**: `UI/MonitorUI.ts`, `UI/MonitorRowUI.ts`
- **Description**: Displays information on the in-game monitor screen.

#### Screens
- **Files**: `UI/Screens/CardCheckoutScreen.ts`, `UI/Screens/CashCheckoutScreen.ts`, `UI/Screens/EndGameScreen.ts`
- **Description**: Various UI screens for the game flow.

### 4. Audio System
- **File**: `SoundManager.ts`
- **Description**: Manages audio, plays one-shot sounds like "Success" when completing a level.

### 5. Game Events
- **File**: `GameEvent.ts`
- **Description**: Defines event constants such as LEVEL_COMPLETED.

### 6. Assets
- **Animations**: Animations for NPCs and objects.
- **Materials**: Materials for rendering (Glass, Money, Monitor, NPC, Outdoor, Outline, etc.).
- **Prefabs**: Prefabs for Customer, Drink, and other items.
- **Scenes**: Game scenes.
- **Resources**: Common resources.

### 7. Optimize Build Size
Create .adapterrc to configure: Compress files, compress images with TinyPNG, compress models, reduce sound quality.

## How to Run the Game
1. Open the project in Cocos Creator 3.8.6+
2. Build
