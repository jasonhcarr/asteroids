(function gameSetup() {
        'use strict';
        var shipElem = document.getElementById('ship');
        var allAsteroids = [];
        var ship = {
            velocity: null,
            angle: 0,
            element: shipElem
        };

        ship.element.style.top = '350px';
        ship.element.style.left = '500px';
        shipElem.addEventListener('asteroidDetected', function(event) {
            allAsteroids.push(event.detail);
        });

        function handleKeys(event) {
            switch (event.keyCode) {
                case 37:
                    ship.angle -= 25;
                    console.log(ship.element.style.transform);
                    ship.element.style.transform = "rotate(" + ship.angle + "deg)";
                    break;
                case 38:
                    ship.velocity < 10 ? ship.velocity++ : ship.velocity = 10;
                    break;
                case 39:
                    ship.angle += 25;
                    ship.element.style.transform = "rotate(" + ship.angle + "deg)";
                    console.log(ship.element.style.transform);
                    break;
                case 40:
                    ship.velocity > 0 ? ship.velocity-- : ship.velocity = 0;
                    break;
            }
        }

    document.querySelector('body').addEventListener('keydown', handleKeys);

    function gameLoop() {
        var move = getShipMovement(ship.velocity, ship.angle);
        var top = parseInt(ship.element.style.top);
        console.log(top);
        ship.element.style.top = (top - move.top) + 'px';
        var left = parseInt(ship.element.style.left);
        ship.element.style.left = (left + move.left) + 'px';
        checkForCollisions();
    }

    function checkForCollisions() {
        var shipPostion = ship.element.getBoundingClientRect();
        for (var i = 0; i < allAsteroids.length; i++) {
            var asteroidPosition = allAsteroids[i].getBoundingClientRect();
            var overlap = !(asteroidPosition.right <= shipPostion.left ||
                asteroidPosition.left >= shipPostion.right ||
                asteroidPosition.bottom <= shipPostion.top ||
                asteroidPosition.top >= shipPostion.bottom);
            if (overlap === true) {
                crash(allAsteroids[i]);
            }
        }
    }

    document.querySelector('main').addEventListener('crash', function() {
        ship.velocity = 0;
    });

    /** ************************************************************************
     *             These functions and code are given to you.
     *
     *                   !!! DO NOT EDIT BELOW HERE !!!
     ** ************************************************************************/

    var loopHandle = setInterval(gameLoop, 20);

    /**
     * Executes the code required when a crash has occurred. You should call
     * this function when a collision has been detected with the asteroid that
     * was hit as the only argument.
     *
     * @param  {HTMLElement} asteroidHit The HTML element of the hit asteroid
     * @return {void}
     */
    function crash(asteroidHit) {
        document.querySelector('body').removeEventListener('keyup', handleKeys);
        asteroidHit.classList.add('hit');
        document.querySelector('#ship').classList.add('crash');

        var event = new CustomEvent('crash', {
            detail: asteroidHit
        });
        document.querySelector('main').dispatchEvent(event);
    }

    /**
     * Get the change in ship position (movement) given the current velocity
     * and angle the ship is pointing.
     *
     * @param  {Number} velocity The current speed of the ship (no units)
     * @param  {Number} angle    The angle the ship is pointing (no units)
     * @return {Object}          The amount to move the ship by with regard to left and top position (object with two properties)
     */
    function getShipMovement(velocity, angle) {
        return {
            left: (velocity * Math.sin(angle * Math.PI / 180)),
            top: (velocity * Math.cos(angle * Math.PI / 180))
        };
    }

})();
