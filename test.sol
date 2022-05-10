pragma solidity >=0.4.22 <0.6.0;
contract Purchase {
uint public value;
address payable public seller;
address payable public buyer;
enum State { Created, Locked, Inactive }
State public state;
// V érifie que `msg.value` est un nombre pair.
// La division tronquerait un nombre impair.
// On multiplie pour vérifier que ce n'était pas un impair.
constructor() public payable {
seller = msg.sender;
value = msg.value / 2;
require((2 * value) == msg.value, "Value has to be even.");
}
modifier condition(bool _condition) {
require(_condition);
_;
}
modifier onlyBuyer() {
require(
msg.sender == buyer,
"Only buyer can call this."
);
_;
}
modifier onlySeller() {
require(
msg.sender == seller,
"Only seller can call this."
);
_;
}
modifier inState(State _state) {
require(
state == _state,
"Invalid state."
);
_;
}
event Aborted();
event PurchaseConfirmed();
event ItemReceived();
/// Annule l'achat et rembourse l'ether du dépot.
/// Peut seulement être appelé par le vendeur
/// avant le verrouillage du contrat
function abort()
public
onlySeller
inState(State.Created)
{
emit Aborted();
state = State.Inactive;
seller.transfer(address(this).balance);
}
/// Confirme l'achat en tant qu'acheteur.
/// La transaction doit inclure `2 * value` ether.
/// L'Ether sera bloqué jusqu'à ce que confirmReceived
/// soit appelé.
function confirmPurchase()
public
inState(State.Created)
condition(msg.value == (2 * value))
payable
{
emit PurchaseConfirmed();
buyer = msg.sender;
state = State.Locked;
}
/// Confirmer que vous (l'acheteur) avez reçu l'objet,
/// ce qui débloquera l'Ether bloqué.
function confirmReceived()
public
onlyBuyer
inState(State.Locked)
{
emit ItemReceived();
// Il est important de changer l'état d'abord car sinon
// les contrats appelés avec `send` ci-dessous
// pourraient rappeler la fonction.
state = State.Inactive;
//
//
//
//
N OTE: Ce schéma autorise les deux acteurs à bloquer
la transaction par une exception "our of gas" ( pas
assez de gas). U n fonction de retrait distincte devrait
être utilisée.
buyer.transfer(value);
seller.transfer(address(this).balance);
}